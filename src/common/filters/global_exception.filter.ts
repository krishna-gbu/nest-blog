// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';
// import { Response } from 'express';

// @Catch()
// export class GlobalExceptionFilter implements ExceptionFilter {
//   catch(exception: unknown, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest();

//     const status =
//       exception instanceof HttpException
//         ? exception.getStatus()
//         : HttpStatus.INTERNAL_SERVER_ERROR;

//     const message =
//       exception instanceof HttpException
//         ? exception.getResponse()
//         : 'Internal Server Error';

//     console.log('status', HttpException);

//     // let status: number;
//     // let message: any;

//     // if (exception instanceof HttpException) {
//     //   // Handle HTTP exceptions
//     //   status = exception.getStatus();
//     //   message = exception.getResponse();
//     //   console.log(status, message);
//     //   console.log(exception, 'exception');
//     //   return;
//     // }
//     // } else if (exception.name === 'ValidationError') {
//     //   // Handle Mongoose Validation Errors
//     //   status = HttpStatus.BAD_REQUEST;
//     //   message = this.formatMongooseValidationError(exception);
//     // } else if (exception.code === 11000) {
//     //   // Handle Mongoose Duplicate Key Errors
//     //   status = HttpStatus.BAD_REQUEST;
//     //   message = `Duplicate key error: ${JSON.stringify(exception.keyValue)}`;
//     // } else if (exception.name === 'CastError') {
//     //   // Handle Mongoose Cast Errors (e.g., invalid ObjectId)
//     //   status = HttpStatus.BAD_REQUEST;
//     //   message = `Invalid ${exception.path}: ${exception.value}`;
//     // } else {
//     //   // Handle generic errors
//     //   status = HttpStatus.INTERNAL_SERVER_ERROR;
//     //   message = 'Internal Server Error';
//     // }

//     response.status(status).json({
//       statusCode: status,
//       timestamp: new Date().toISOString(),
//       path: request.url,
//       message,
//     });
//   }
// }

// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';

// @Catch()
// export class GlobalExceptionFilter implements ExceptionFilter {
//   catch(exception: unknown, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();
//     const request = ctx.getRequest();

//     let status: number;
//     let message: any;

//     if (exception instanceof HttpException) {
//       // Handle HTTP exceptions
//       status = exception.getStatus();
//       message = exception.getResponse();
//     } else if (this.isValidationError(exception)) {
//       // Handle Mongoose Validation Errors
//       status = HttpStatus.BAD_REQUEST;
//       message = this.formatMongooseValidationError(exception);
//     } else if (this.isDuplicateKeyError(exception)) {
//       // Handle Mongoose Duplicate Key Errors
//       status = HttpStatus.BAD_REQUEST;
//       message = `Duplicate key error: ${JSON.stringify(exception.keyValue)}`;
//     } else if (this.isCastError(exception)) {
//       // Handle Mongoose Cast Errors (e.g., invalid ObjectId)
//       status = HttpStatus.BAD_REQUEST;
//       message = `Invalid ${exception.path}: ${exception.value}`;
//     } else {
//       // Handle generic errors
//       status = HttpStatus.INTERNAL_SERVER_ERROR;
//       message = 'Internal Server Error';
//     }

//     response.status(status).json({
//       statusCode: status,
//       timestamp: new Date().toISOString(),
//       path: request.url,
//       message,
//     });
//   }

//   private isValidationError(exception: unknown): exception is any {
//     console.log((exception as any).name, 'df');

//     return (
//       typeof exception === 'object' &&
//       exception !== null &&
//       (exception as any).name === 'ValidationError'
//     );
//   }

//   private isDuplicateKeyError(exception: unknown): exception is any {
//     console.log(exception, 'duplicate');

//     return (
//       typeof exception === 'object' &&
//       exception !== null &&
//       (exception as any).code === 11000
//     );
//   }

//   private isCastError(exception: unknown): exception is any {
//     return (
//       typeof exception === 'object' &&
//       exception !== null &&
//       (exception as any).name === 'CastError'
//     );
//   }

//   private formatMongooseValidationError(error: any): string {
//     return Object.values(error.errors || {})
//       .map((err: any) => err.message)
//       .join(', ');
//   }
// }

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse() as string;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
