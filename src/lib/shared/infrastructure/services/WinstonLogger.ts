
import winston from 'winston'

import { ILogger } from '../../application/services/ILogger';
import envs from '../../../config/envs';

export class WinstonLogger implements ILogger {

    private logger: winston.Logger;
    private appName: string = envs.APP_NAME;

    constructor(){
        const logFormat = envs.NODE_ENV === 'production' ? winston.format.json() : winston.format.prettyPrint();
        this.logger = winston.createLogger({
            level: envs.LOG_LEVEL || 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                logFormat
            ),
            defaultMeta: { app: this.appName },
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: envs.FILE_LOG })
            ]
        });

    }

    public info(message: string, context?: Record<string, any>): void {
        this.logger.info(message, context );
    }

    public warn(message: string, context?: Record<string, any>): void {
        this.logger.warn(message, context);
    }

    public error(message: string, error?: Error, context?: Record<string, any>): void {
        this.logger.error(message, { error, context} );
    }
    
    public debug(message: string, context?: Record<string, any>): void {
        this.logger.debug(message, context);
    }

    public http(message: string, context?: Record<string, any>): void {
        this.logger.http(message, context);
    }

}