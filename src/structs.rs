use serde::{Deserialize, Serialize};
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
