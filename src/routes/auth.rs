use actix_identity::Identity;
use actix_web::{web, HttpMessage, HttpRequest, HttpResponse};
use rust_actix_web_sqlx::databases::mysql;
use rust_actix_web_sqlx::errors::Error;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Auth {
    email: String,
    password: String,
}

pub async fn signin_post(
    request: HttpRequest,
    args: web::Json<Auth>,
) -> Result<HttpResponse, Error> {
    let pool = match mysql::create_mysql_connection_pool().await {
        Ok(pool) => pool,
        Err(_) => panic!("error"),
    };

    let mysql_auth_row: Auth =
        match sqlx::query_as("select email,password from users where email = ?")
            .bind(&args.email)
            .fetch_one(&pool)
            .await
        {
            Ok(row) => row,
            Err(_) => panic!("auth error"),
        };
    println!("{:?}", mysql_auth_row);

    Identity::login(&request.extensions(), "User1".into()).unwrap();

    Ok(HttpResponse::Ok().json("hoge"))
}

pub async fn signout_post(user: Identity) -> Result<HttpResponse, Error> {
    println!("called");
    user.logout();
    Ok(HttpResponse::Ok().json("ok"))
}
