import { IFileUpload } from "../../application/interfaces/IFileUpload";
import { ILogger } from "../../application/services/ILogger";
import  multer, {Multer}  from 'multer';
import { RequestHandler } from "express";
import path from 'path';
import { InvalidPropertyError } from "../../domain/errors";
import { inject, injectable } from "inversify";
import { SHARED_TYPES } from "../../types";

const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];

@injectable()
export class FileUploadMulter implements IFileUpload {

    private readonly mul: Multer;
    
    constructor( @inject(SHARED_TYPES.Logger) private readonly logger: ILogger, destiny: string = 'tmp/'){
        this.mul = multer({
           fileFilter: (req, file, cb) => {
                if (allowedMimeTypes.includes(file.mimetype)) {
                    cb(null, true);
                } else {
                    cb(new InvalidPropertyError(`Invalid file type: ${file.mimetype}. Only ${allowedMimeTypes.join(', ')} are allowed.`, 'file', file.mimetype));
                }
            },
           storage: multer.diskStorage({
                    // a. Dónde se guardarán los archivos
                    destination: function (req, file, cb) {
                        cb(null, destiny); // La carpeta 'uploads/' debe existir
                    },

                    // b. Qué nombre tendrán los archivos
                    filename: function (req, file, cb) {
                        // `file.fieldname` - el nombre del campo en el formulario (ej: 'avatar')
                        // `Date.now()` - timestamp para hacerlo único
                        // `path.extname(file.originalname)` - la extensión del archivo original (ej: '.jpg')
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
                    }
                    }),
            limits: {
                fileSize: 1024 * 1024 * 20 // 20MB
            }
        });
        this.logger.info('FileUploadMulter Ready');
    }

    single(fileName: string): RequestHandler {
        return this.mul.single(fileName);
    }

    multiple(fileName: string, maxCount: number): RequestHandler {
        return this.mul.array(fileName, maxCount);
    }

   
}