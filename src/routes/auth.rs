use actix_identity::Identity;
use actix_web::{web, HttpResponse};
use rust_actix_web_sqlx::databases::mysql;
use rust_actix_web_sqlx::errors::Error;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Auth {
    email: String,
    password: String,
}

pub async fn signin_post(id: Identity, args: web::Json<Auth>) -> Result<HttpResponse, Error> {
    let pool = match mysql::create_mysql_connection_pool().await {
        Ok(pool) => pool,
        Err(_) => panic!("error"),
    };

    Ok(HttpResponse::Ok().json("hoge"))
}
