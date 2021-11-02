const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}] ${stack || message}`;
});

const prodLogger = () => {
    return createLogger({
        level : "info",
        format: combine (
            timestamp(),
            format.errors({stack: true}),
            logFormat
        ),
        transports: [
            new transports.Console(),
            new transports.File({filename : 'errors.log'})
        ]
    });
}

module.exports = prodLogger