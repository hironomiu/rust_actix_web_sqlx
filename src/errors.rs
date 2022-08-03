use actix_web::ResponseError;
use std::env;
use thiserror::Error;
use tracing::error;

#[derive(Debug, Error)]
pub enum Error {
    #[error("sqlx error: {0}")]
    Sqlx(#[from] sqlx::Error),
    #[error("io error: {0}")]
    Var(#[from] env::VarError),
}

impl ResponseError for Error {}
