pub struct RspcError {
    pub code: rspc::ErrorCode,
    pub message: String,
}

impl Default for RspcError {
    fn default() -> Self {
        RspcError {
            code: rspc::ErrorCode::InternalServerError,
            message: "Something went wrong".to_string(),
        }
    }
}

impl RspcError {
    pub fn internal_server_error(msg: String) -> Self {
        RspcError {
            code: rspc::ErrorCode::InternalServerError,
            message: msg,
        }
    }
}

impl From<RspcError> for rspc::Error {
    fn from(value: RspcError) -> Self {
        rspc::Error::new(value.code, value.message)
    }
}
