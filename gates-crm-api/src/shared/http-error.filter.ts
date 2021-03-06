import { Logger } from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const errorResponse = {
      code: status,
      path: request.url,
      method: request.method,
      message: exception.message || null,
    };

    Logger.error(
      JSON.stringify(errorResponse),
      exception.stack,
      'ExceptionFilter',
    );
    response.status(status).json(errorResponse);
  }
}
