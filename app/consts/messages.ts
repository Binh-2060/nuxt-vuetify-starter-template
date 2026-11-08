// consts/messages.ts
// every error text the app shows, in one place to translate or hook into i18n later
export default {
  ERROR_TITLE: "ຜິດພາດ", // default catchError dialog title
  API_ERROR: "Unknown error", // status 0 response with no error message
  OFFLINE: "No internet connection.",
  TIMEOUT: "Request timed out.",
  HTTP_ERROR: "Something went wrong", // HTTP error with no error message in the body
  UNEXPECTED_ERROR: "Something went wrongs", // thrown value that isn't an Error
};
