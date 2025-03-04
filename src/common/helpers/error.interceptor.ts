// all-exceptions.filter.ts
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
import { ResponsesData } from '../library/response.data';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    private responseData = new ResponsesData();
  
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
  
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';
      let errors = null;
  
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
  
        if (typeof exceptionResponse === 'object') {
          message = (exceptionResponse as any).message || message;
          errors = (exceptionResponse as any).errors || null;
        } else {
          message = exceptionResponse.toString();
        }
      }
      console.log(message,errors);
  
      response.status(status).json(
        this.responseData.errorResponse(message, status, errors),
      );
    }
  }
  