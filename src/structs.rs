use serde::{Deserialize, Serialize};
use validator::Validate;

#[derive(Debug, Deserialize, Serialize)]
pub struct SamplePost {
    pub title: String,
    pub body: String,
}

#[derive(Debug, sqlx::FromRow, Deserialize, Serialize)]
pub struct SampleRow {
    pub id: i64,
    pub title: String,
    pub body: String,
}

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow, Validate)]
pub struct Auth {
    #[validate(length(min = 3))]
    pub email: String,
    #[validate(length(min = 3))]
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct MysqlRowAuth {
    pub id: u32,
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Message {
    #[serde(rename(serialize = "isSuccess", deserialize = "is_success"))]
    pub is_success: bool,
    pub message: String,
}
