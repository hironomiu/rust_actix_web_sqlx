use crate::errors;
use sqlx::mysql::{MySqlConnectOptions, MySqlPoolOptions};

pub async fn create_mysql_connection_pool() -> Result<sqlx::Pool<sqlx::MySql>, errors::Error> {
    let mysql_config = MySqlConnectOptions::new()
        .host("127.0.0.1")
        .username("root")
        .password("mysql")
        .database("sample")
        .port(3306);

    let connection_pool = match MySqlPoolOptions::new()
        .max_connections(5)
        .connect_with(mysql_config)
        .await
    {
        Ok(pool) => pool,
        Err(e) => return Err(errors::Error::Sqlx(e)),
    };

    Ok(connection_pool)
}
