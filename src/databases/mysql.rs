use crate::errors;
use dotenv::dotenv;
use sqlx::mysql::{MySqlConnectOptions, MySqlPoolOptions};
use std::env;

pub async fn create_mysql_connection_pool() -> Result<sqlx::Pool<sqlx::MySql>, errors::Error> {
    dotenv().ok();
    let host = match env::var("MYSQL_DATABASE_HOST") {
        Ok(host) => host,
        Err(e) => return Err(errors::Error::Var(e)),
    };

    let port = env::var("MYSQL_DATABASE_PORT")
        .expect("MYSQL_DATABASE_PORT error")
        .parse::<u16>()
        .expect("parse error");
    let user = env::var("MYSQL_DATABASE_USER").expect("MYSQL_DATABASE_USER error");
    let password = env::var("MYSQL_DATABASE_PASS").expect("MYSQL_DATABASE_PASS error");
    let database = env::var("MYSQL_DATABASE_NAME").expect("MYSQL_DATABASE_NAME error");
    let max_connection = env::var("MYSQL_DATABASE_MAX_CONNECTION_SIZE")
        .expect("MYSQL_DATABASE_MAX_CONNECTION_SIZE error")
        .parse::<u32>()
        .expect("parse error");
    let mysql_config = MySqlConnectOptions::new()
        .host(&host)
        .username(&user)
        .password(&password)
        .database(&database)
        .port(port);

    let connection_pool = match MySqlPoolOptions::new()
        .max_connections(max_connection)
        .connect_with(mysql_config)
        .await
    {
        Ok(pool) => pool,
        Err(e) => return Err(errors::Error::Sqlx(e)),
    };

    Ok(connection_pool)
}
