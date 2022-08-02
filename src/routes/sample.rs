use actix_web::{web, HttpResponse};
use rust_actix_web_sqlx::databases::mysql;
use serde::{Deserialize, Serialize};

#[derive(Debug, sqlx::FromRow, Deserialize, Serialize)]
struct SampleRow {
    id: i64,
    title: String,
    body: String,
}

pub async fn get() -> Result<HttpResponse, actix_web::Error> {
    let pool = match mysql::create_mysql_connection_pool().await {
        Ok(pool) => pool,
        Err(_) => panic!("error"),
    };

    let mysql_sample_rows: Vec<SampleRow> = match sqlx::query_as("select id,title,body from sample")
        .fetch_all(&pool)
        .await
    {
        Ok(rows) => rows,
        Err(_) => panic!("error"),
    };
    println!("{:?}", mysql_sample_rows);

    Ok(HttpResponse::Ok().json(mysql_sample_rows))
}

#[derive(Debug, Deserialize, Serialize)]
pub struct SamplePost {
    title: String,
    body: String,
}
pub async fn post(args: web::Json<SamplePost>) -> Result<HttpResponse, actix_web::Error> {
    Ok(HttpResponse::Ok().json(&args.title))
}
