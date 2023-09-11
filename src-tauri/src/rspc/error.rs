/// RspcError is a wrapper to rspc::Error for better error handling
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
    pub fn not_found(msg: String) -> Self {
        RspcError {
            code: rspc::ErrorCode::NotFound,
            message: msg,
        }
    }
}

/// This is for converting  RspcError to rspc::Error
/// so that we can use it in the tauri app
///
/// This helps us to rely on the question mark operator to convert it into an rspc::Error type.
///
/// See: https://www.rspc.dev/server/error-handling
impl From<RspcError> for rspc::Error {
    fn from(value: RspcError) -> Self {
        rspc::Error::new(value.code, value.message)
    }
}
