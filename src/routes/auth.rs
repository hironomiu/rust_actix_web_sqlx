use actix_identity::Identity;
use actix_web::{web, HttpMessage, HttpRequest, HttpResponse};
use pwhash::bcrypt;
use rust_actix_web_sqlx::databases::mysql;
use rust_actix_web_sqlx::errors::Error;
use rust_actix_web_sqlx::structs::{Auth, Message, MysqlRowAuth};
use serde::Deserialize;
use validator::Validate;

pub async fn signin_get(user: Option<Identity>) -> Result<HttpResponse, Error> {
    println!("called get user is_none:{:?}", user.is_none());
    let mut message: Message = Message {
        is_success: false,
        message: String::from("ng"),
    };

    if let Some(user) = user {
        message.is_success = true;
        message.message = String::from("ok");
        println!("hoge{:?}", user.id());
        return Ok(HttpResponse::Ok().json(message));
    }

    println!("no user");

    Ok(HttpResponse::Ok().json(message))
}

#[derive(Deserialize, Validate)]
struct Info {
    #[validate(length(min = 3))]
    email: String,
    #[validate(length(min = 1))]
    password: String,
}

pub async fn signin_post(
    request: HttpRequest,
    args: web::Json<Auth>,
    // info: Json<Info>,
) -> Result<HttpResponse, Error> {
    match args.validate() {
        Ok(_) => (),
        Err(error) => panic!("{:?}", error),
    }

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
        println!("id:{}", mysql_auth_row.email);
        Identity::login(&request.extensions(), mysql_auth_row.id.to_string().into()).unwrap();
        message.is_success = true;
        message.message = String::from("ok");
        println!("OKOKOKOKOK");
        Ok(HttpResponse::Ok().json(message))
    } else {
        Ok(HttpResponse::Ok().json(message))
    }
}

// TODO: actix-csrfだとhttponlyがfalseのため心もとない＆tokenとcookieの利用方法も不明瞭なので一旦CSRF対策は待ち
pub async fn signout_post(user: Identity) -> Result<HttpResponse, Error> {
    println!("called");
    user.logout();
    let message = Message {
        is_success: true,
        message: String::from("success"),
    };

    Ok(HttpResponse::Ok().json(message))
}
