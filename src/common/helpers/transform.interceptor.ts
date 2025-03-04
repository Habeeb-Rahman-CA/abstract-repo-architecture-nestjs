// response.interceptor.ts
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { map } from 'rxjs/operators';
  import { Observable } from 'rxjs';
import { ResponsesData } from '../library/response.data';
  
  @Injectable()
  export class ResponseInterceptor implements NestInterceptor {
    private responseData = new ResponsesData();
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((data) => {
          // Avoid double wrapping if data is already in the expected format
          if (data?.status && data?.message && data?.data) {
            return data;
          }
          return this.responseData.successResponse(data);
        }),
      );
    }
  }
  