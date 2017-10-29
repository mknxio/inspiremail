function IMError (message, errorType) {
    errorType = errorType || Error;

    var msg = '[IMError] ' + message;
    return new errorType(msg);
}
