use actix_web::{web, HttpResponse};
use rust_actix_web_sqlx::databases::mysql;
use rust_actix_web_sqlx::errors;
use rust_actix_web_sqlx::structs::{SamplePost, SampleRow};

pub async fn get() -> Result<HttpResponse, errors::Error> {
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

pub async fn post(args: web::Json<SamplePost>) -> Result<HttpResponse, errors::Error> {
    let pool = match mysql::create_mysql_connection_pool().await {
        Ok(pool) => pool,
        Err(_) => panic!("error"),
    };
    let mysql_response = match sqlx::query("insert into sample(title,body) values(?,?)")
        .bind(&args.title)
        .bind(&args.body)
        .execute(&pool)
        .await
    {
        Ok(v) => v,
        Err(_) => panic!("error"),
    };
    // MEMO: MySqlQueryResult { rows_affected: 1, last_insert_id: 6 }
    println!("{:?}", mysql_response);
    Ok(HttpResponse::Ok().json(&args.title))
}
