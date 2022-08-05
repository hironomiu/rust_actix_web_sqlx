use actix_identity::Identity;
use actix_web::{web, HttpMessage, HttpRequest, HttpResponse};
use pwhash::bcrypt;
use rust_actix_web_sqlx::databases::mysql;
use rust_actix_web_sqlx::errors::Error;
use serde::{Deserialize, Serialize};

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
    is: bool,
    message: String,
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
        is: false,
        message: String::from("ng"),
    };
    if is_signin_success {
        Identity::login(&request.extensions(), mysql_auth_row.id.to_string().into()).unwrap();
        message.is = true;
        message.message = String::from("ok");
        Ok(HttpResponse::Ok().json(message))
    } else {
        Ok(HttpResponse::Ok().json(message))
    }
}

pub async fn signout_post(user: Identity) -> Result<HttpResponse, Error> {
    println!("called");
    user.logout();
    Ok(HttpResponse::Ok().json("ok"))
}
