
import path from 'path'
import { createLogger, format, transports } from "winston"
import DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, label, printf,prettyPrint } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp as string)
    const hour = date.getHours()
    const minutes =date.getMinutes()
    const seconds = date.getSeconds()
  return `${date.toDateString()}${hour}:${minutes}:${seconds}[${label}] ${level}: ${message}`;
});
const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'Jack' }),
    timestamp(),
    myFormat,
    prettyPrint()
  ),
  transports: [
new transports.Console(),
new DailyRotateFile({
    filename:path.join(process.cwd(),"logs","winston","successes","Jack-%DATE%-success.log"),
    datePattern: 'DD-MM-YYYY-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
})],

});
const errorLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'Jack' }),
    timestamp(),
    myFormat,
    prettyPrint()
  ),
  transports: [
    new transports.Console(),

new DailyRotateFile({
    filename:path.join(process.cwd(),"logs","winston","errors","Jack-%DATE%-error.logs"),
    datePattern: 'DD-MM-YYYY-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
})],
});
export {logger,errorLogger}