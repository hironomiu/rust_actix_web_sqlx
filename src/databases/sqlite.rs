use sqlx::{
    sqlite::{SqliteConnectOptions, SqliteConnection},
    Connection,
};

use std::path::PathBuf;

// TODO: 一旦パスは固定、どこかで引数で受ける
pub async fn connect_sqlite_db() -> sqlx::Result<SqliteConnection> {
    let path = PathBuf::from("./sqlite_db/sample.db");
    SqliteConnection::connect_with(&SqliteConnectOptions::new().filename(path)).await
}
