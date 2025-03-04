// response-utils.ts
export class ResponsesData {
    errorResponse(message: string, statusCode: number, errors: any = null) {
      return {
        status: 'error',
        message,
        statusCode,
        errors: errors ?? {},
      };
    }
  
    successResponse(data: object | any[], message = 'Success') {
      return {
        status: 'success',
        message,
        statusCode:200,
        data: data ?? {},
      };
    }
  }
  