use actix_csrf::extractor::{Csrf, CsrfGuarded, CsrfHeader, CsrfToken};
use actix_identity::Identity;
use actix_web::web::Json;
use actix_web::{web, HttpMessage, HttpRequest, HttpResponse};
use pwhash::bcrypt;
use rust_actix_web_sqlx::databases::mysql;
use rust_actix_web_sqlx::errors::Error;
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct Request {
    csrf: CsrfToken,
}

impl CsrfGuarded for Request {
    fn csrf_token(&self) -> &CsrfToken {
        println!("called");
        &self.csrf
    }
}

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Auth {
    email: String,
    password: String,
}

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct MysqlRowAuth {
    id: u32,
    email: String,
    password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Message {
    // TODO: is -> isSuccess (キャメル、スネークの対応)
    #[serde(rename(serialize = "isSuccess", deserialize = "is_success"))]
    is_success: bool,
    message: String,
}

pub async fn signin_get(user: Option<Identity>) -> Result<HttpResponse, Error> {
    let mut message: Message = Message {
        is_success: false,
        message: String::from("ng"),
    };

    if let Some(_) = user {
        message.is_success = true;
        message.message = String::from("ok");
        return Ok(HttpResponse::Ok().json(message));
    }
    Ok(HttpResponse::Ok().json(message))
}

pub async fn signin_post(
    request: HttpRequest,
    args: web::Json<Auth>,
) -> Result<HttpResponse, Error> {
    let pool = match mysql::create_mysql_connection_pool().await {
        Ok(pool) => pool,
        Err(_) => panic!("error"),
    };

    let mysql_auth_row: MysqlRowAuth =
        match sqlx::query_as("select id,email,password from users where email = ?")
            .bind(&args.email)
            .fetch_one(&pool)
            .await
        {
            Ok(row) => row,
            // TODO: HttpResponseでnot foundを返す
            Err(_) => panic!("auth error"),
        };
    println!("{:?}", mysql_auth_row);

    let is_signin_success = bcrypt::verify(&args.password, &mysql_auth_row.password);

    println!("signin is {}", is_signin_success);

    let mut message: Message = Message {
        is_success: false,
        message: String::from("ng"),
    };
    if is_signin_success {
        Identity::login(&request.extensions(), mysql_auth_row.id.to_string().into()).unwrap();
        message.is_success = true;
        message.message = String::from("ok");
        Ok(HttpResponse::Ok().json(message))
    } else {
        Ok(HttpResponse::Ok().json(message))
    }
}

// TODO: actix-csrfだとhttponlyがfalseのため心もとない＆tokenとcookieの利用方法も不明瞭なので一旦CSRF対策は待ち
pub async fn signout_post(
    user: Identity,
    json: Csrf<Json<Request>>,
) -> Result<HttpResponse, Error> {
    println!("called");
    // println!("csrf is {:?}", json.csrf_token());
    user.logout();
    Ok(HttpResponse::Ok().json("ok"))
}
