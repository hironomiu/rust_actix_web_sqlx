use actix_web::{get, web, App, HttpResponse, HttpServer};
mod routes;

#[get("/")]
async fn index() -> Result<HttpResponse, actix_web::Error> {
    let response_body = "hello";
    Ok(HttpResponse::Ok().body(response_body))
}

#[actix_web::main]
async fn main() -> Result<(), actix_web::Error> {
    HttpServer::new(move || {
        App::new().service(index).service(
            web::scope("/api").service(
                web::scope("/v1").service(
                    web::scope("/sample")
                        .route("", web::get().to(routes::sample::get))
                        .route("", web::post().to(routes::sample::post)),
                ),
            ),
        )
    })
    .bind("0.0.0.0:8686")?
    .run()
    .await?;
    Ok(())
}
