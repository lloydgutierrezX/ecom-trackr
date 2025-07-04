type ILogType = 'trace-in' | 'trace-out' | 'info' | 'warn' | 'error' | 'debug';

const formatMessage = (type: ILogType, message: string): string => {
  const timestamp = new Date().toISOString();
  const label = type.toUpperCase();
  return type === 'trace-in' || type === 'trace-out' ?
    `[${type.toUpperCase()}] ${message.toUpperCase()}` :
    `[${timestamp}][${label}] ${message}`;
}

export const logger = {
  info: (message: string) => console.info(formatMessage('info', message)),
  error: (message: string) => console.error(formatMessage('error', message)),
  warn: (message: string) => console.warn(formatMessage('warn', message)),
  debug: (message: string) => console.debug(formatMessage('debug', message)),
  traceIn: (message: string) => {
    console.info("=".repeat(40));
    console.info(formatMessage('trace-in', message));
    console.info("-".repeat(40));
  },
  traceOut: (message: string) => {
    console.info("-".repeat(40));
    console.info(formatMessage('trace-out', message));
    console.info("-".repeat(40));
  },
}