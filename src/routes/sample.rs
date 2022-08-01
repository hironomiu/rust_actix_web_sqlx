use actix_web::{web, HttpResponse};
use serde::{Deserialize, Serialize};

pub async fn get() -> Result<HttpResponse, actix_web::Error> {
    Ok(HttpResponse::Ok().json("ok"))
}

#[derive(Debug, Deserialize, Serialize)]
pub struct SamplePost {
    title: String,
    body: String,
}
pub async fn post(args: web::Json<SamplePost>) -> Result<HttpResponse, actix_web::Error> {
    Ok(HttpResponse::Ok().json(&args.title))
}
