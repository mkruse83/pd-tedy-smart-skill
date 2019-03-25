class ErrorHandler {
  canHandle(request) {
    console.log("ErrorHandler.canHandle");
    return true;
  }

  handle() {
    return "Error: Unknown handler requested";
  }
}

module.exports = ErrorHandler;
