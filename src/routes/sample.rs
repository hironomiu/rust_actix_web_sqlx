use actix_identity::Identity;
use actix_web::{web, HttpResponse};
use rust_actix_web_sqlx::databases::{mysql, sqlite};
use rust_actix_web_sqlx::errors;
use rust_actix_web_sqlx::structs::{SamplePost, SampleRow};

pub async fn get(user: Identity) -> Result<HttpResponse, errors::Error> {
    println!("{:?}", user.id());
    // MEMO: ---------- MySQL ----------
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
    println!("MySQL: {:?}", mysql_sample_rows);

    // MEMO: ---------- sqlite ----------
    let mut sqlite_conn = match sqlite::connect_sqlite_db().await {
        Ok(conn) => conn,
        Err(_) => panic!("error"),
    };

    let rows: Vec<SampleRow> = match sqlx::query_as("select id,title,body from sample")
        .fetch_all(&mut sqlite_conn)
        .await
    {
        Ok(rows) => rows,
        Err(_) => panic!("error"),
    };
    println!("sqlite: {:?}", rows);

    Ok(HttpResponse::Ok().json(mysql_sample_rows))
}

pub async fn post(args: web::Json<SamplePost>) -> Result<HttpResponse, errors::Error> {
    // MEMO: ---------- MySQL ----------
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

    // MEMO: ---------- sqlite ----------
    let mut sqlite_conn = sqlite::connect_sqlite_db().await?;
    let sqlite_response =
        sqlx::query("insert into sample(title,body,created_at,updated_at) values(?,?,?,?)")
            .bind(&args.title)
            .bind(&args.body)
            .bind(1)
            .bind(1)
            .execute(&mut sqlite_conn)
            .await?;
    // MEMO: SqliteQueryResult { changes: 1, last_insert_rowid: 5 }
    println!("{:?}", sqlite_response);
    Ok(HttpResponse::Ok().json(&args.title))
}
