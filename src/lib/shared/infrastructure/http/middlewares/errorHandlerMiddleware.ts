import { Request, Response, NextFunction } from 'express';
import { InvalidPropertyError, TemporaryFileAccessError, DomainRuleViolationError } from '../../../../shared/domain/errors';
import { ILogger } from '../../../../shared/application/services/ILogger';


export const createErrorHandlerMiddleware = (logger: ILogger) => { 
    return (
        err: Error, 
        req: Request, 
        res: Response, 
        next: NextFunction
    ): void => {

        let statusCode = 500;
        let message = 'Internal server error';
        let details: any = {error: 'something went wrong'};

        if(err instanceof InvalidPropertyError) {
            statusCode = 400;
            message = err.message;
            details = { property: err.propName, value: err.propValue };
        } else if (err instanceof TemporaryFileAccessError || err instanceof DomainRuleViolationError) {
            statusCode = 500;
            message = 'Internal server error';
            details = { error: err.message };
        }

        logger.error('Error in request', err, { url: req.originalUrl, method: req.method, ip: req.ip });

        res.status(statusCode).json({
            message,
            details,
            timestamp: new Date().toISOString(),
            path: req.originalUrl,
            method: req.method,
            ip: req.ip,
        });

    }
}