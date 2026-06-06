const LOG_LEVELS = { ERROR: 0, WARN: 1, INFO: 2, DEBUG: 3 };
const currentLevel =
  LOG_LEVELS[process.env.LOG_LEVEL?.toUpperCase()] || LOG_LEVELS.INFO;

function log(level, message, data = null) {
  if (LOG_LEVELS[level] <= currentLevel) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${message}`;
    if (level === "ERROR") console.error(logMessage, data || "");
    else console.log(logMessage, data ? JSON.stringify(data) : "");
  }
}

export const logger = {
  error: (msg, data) => log("ERROR", msg, data),
  warn: (msg, data) => log("WARN", msg, data),
  info: (msg, data) => log("INFO", msg, data),
  debug: (msg, data) => log("DEBUG", msg, data),
};
