use actix_cors::Cors;
// use actix_csrf::extractor::CsrfToken;
use actix_csrf::CsrfMiddleware;

use actix_identity::IdentityMiddleware;
use actix_session::{storage::RedisSessionStore, SessionMiddleware};
use actix_web::cookie::Key;
use actix_web::http::Method;
use actix_web::{get, http, web, App, HttpResponse, HttpServer};
use dotenv::dotenv;
use rand::rngs::StdRng;
use std::env;
mod routes;

#[get("/")]
async fn index() -> Result<HttpResponse, actix_web::Error> {
    let response_body = "hello";
    Ok(HttpResponse::Ok().body(response_body))
}

// #[get("/csrf")]
// async fn csrf_index(token: CsrfToken) -> Result<HttpResponse, actix_web::Error> {
//     println!("csrf token value {:?}", token.get());
//     Ok(HttpResponse::Ok().json(token.get()))
// }

#[actix_web::main]
async fn main() -> Result<(), actix_web::Error> {
    dotenv().ok();

    let secret_key = Key::generate();

    let server_address = env::var("SERVER_ADDRESS").expect("SERVER_ADDRESS error");
    let cors_allowed_origin = env::var("CORS_ALLOWED_ORIGIN").expect("CORS_ALLOWED_ORIGIN error");
    let redis_store = RedisSessionStore::new("redis://127.0.0.1:6379")
        .await
        .unwrap();
    println!("allow-origin:{}", cors_allowed_origin);
    println!("server_address:{}", server_address);
    HttpServer::new(move || {
        let csrf = CsrfMiddleware::<StdRng>::new()
            .http_only(false)
            .set_cookie(Method::GET, "/csrf")
            .cookie_name("csrf");

        let cors = Cors::default()
            .allowed_origin(&cors_allowed_origin)
            // .allowed_origin_fn(|origin, _req_head| origin.as_bytes().ends_with(b".rust-lang.org"))
            .allowed_origin_fn(|_origin, _req_head| true)
            .allowed_methods(vec!["GET", "POST", "OPTIONS"])
            .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT])
            .allowed_header(http::header::CONTENT_TYPE)
            .supports_credentials()
            .max_age(3600);

        App::new()
            .wrap(IdentityMiddleware::default())
            .wrap(SessionMiddleware::new(
                // CookieSessionStore::default(),
                redis_store.clone(),
                secret_key.clone(),
            ))
            // .wrap(csrf)
            .wrap(cors)
            .service(index)
            // .service(csrf_index)
            .service(
                web::scope("/api").service(
                    web::scope("/v1")
                        .service(
                            web::scope("/sample")
                                .route("", web::get().to(routes::sample::get))
                                .route("", web::post().to(routes::sample::post)),
                        )
                        .service(
                            web::scope("/auth")
                                .service(
                                    web::scope("/signin")
                                        .route("", web::post().to(routes::auth::signin_post))
                                        .route("", web::get().to(routes::auth::signin_get)),
                                )
                                .service(
                                    web::scope("/signout")
                                        .route("", web::post().to(routes::auth::signout_post)),
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
