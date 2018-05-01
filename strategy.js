class ErrorHandler {
    constructor (handler) {
        if (!handler || !handler.handle) {
            throw new Error('Provided handler is invalid');
        }
        this.handler = handler;
    }

    handle (errorTitle, errorBody, errorObject) {
        this.handler.handle(errorTitle, errorBody);
    }
}

class ConsoleLogHandler {
    handle (errorTitle, errorBody) {
        console.log('console error handler');
        console.log('title :' + errorTitle, 'body :' + errorBody);
    }
}

class OtherConsoleLogHandler {
    handle (errorTitle, errorBody) {
        console.log('other console error handler');
        console.log('title :' + errorTitle, 'body :' + errorBody);
    }
}

function configureErrorHandler () {
    let errorHandler = new ErrorHandler(new ConsoleLogHandler());
    return errorHandler;
}

let errorHandler = configureErrorHandler();

try {
    throw new Error('Dummy error')
} catch (error) {
    errorHandler.handle('Unnoun Error', 'Oops, seems like something went wrong', error)
}
