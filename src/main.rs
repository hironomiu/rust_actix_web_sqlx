use actix_cors::Cors;
use actix_web::{get, http, web, App, HttpResponse, HttpServer};
mod routes;

#[get("/")]
async fn index() -> Result<HttpResponse, actix_web::Error> {
    let response_body = "hello";
    Ok(HttpResponse::Ok().body(response_body))
}

#[actix_web::main]
async fn main() -> Result<(), actix_web::Error> {
    // TODO: .envに切り出す
    let server_address = "0.0.0.0:8686";
    // TODO: .envに切り出す
    let cors_allowed_origin = "http://localhost:3000";
    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin(&cors_allowed_origin)
            .allowed_origin_fn(|origin, _req_head| origin.as_bytes().ends_with(b".rust-lang.org"))
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT])
            .allowed_header(http::header::CONTENT_TYPE)
            .max_age(3600);
        App::new().wrap(cors).service(index).service(
            web::scope("/api").service(
                web::scope("/v1").service(
                    web::scope("/sample")
                        .route("", web::get().to(routes::sample::get))
                        .route("", web::post().to(routes::sample::post)),
                ),
            ),
        )
    })
    .bind(server_address)?
    .run()
    .await?;
    Ok(())
}
