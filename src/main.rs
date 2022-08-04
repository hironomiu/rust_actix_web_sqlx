use actix_cors::Cors;
use actix_identity::IdentityMiddleware;
use actix_session::storage::SessionStore;
use actix_session::SessionMiddleware;
use actix_web::cookie::Key;
use actix_web::{get, http, web, App, HttpResponse, HttpServer};
use dotenv::dotenv;
use std::env;
mod routes;

#[get("/")]
async fn index() -> Result<HttpResponse, actix_web::Error> {
    let response_body = "hello";
    Ok(HttpResponse::Ok().body(response_body))
}

#[actix_web::main]
async fn main() -> Result<(), actix_web::Error> {
    dotenv().ok();
    let secret_key = Key::generate();

    let server_address = env::var("SERVER_ADDRESS").expect("SERVER_ADDRESS error");
    let cors_allowed_origin = env::var("CORS_ALLOWED_ORIGIN").expect("CORS_ALLOWED_ORIGIN error");
    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin(&cors_allowed_origin)
            .allowed_origin_fn(|origin, _req_head| origin.as_bytes().ends_with(b".rust-lang.org"))
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT])
            .allowed_header(http::header::CONTENT_TYPE)
            .max_age(3600);
        App::new()
            .wrap(IdentityMiddleware::default())
            .wrap(cors)
            .service(index)
            .service(
                web::scope("/api").service(
                    web::scope("/v1")
                        .service(
                            web::scope("/sample")
                                .route("", web::get().to(routes::sample::get))
                                .route("", web::post().to(routes::sample::post)),
                        )
                        .service(
                            web::scope("/auth").service(
                                web::scope("signin")
                                    .route("", web::post().to(routes::auth::signin_post)),
                            ),
                        ),
                ),
            )
    })
    .bind(server_address)?
    .run()
    .await?;
    Ok(())
}
