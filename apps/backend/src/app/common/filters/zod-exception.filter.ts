import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ZodExceptionFilter implements ExceptionFilter {
  catch(exception: ZodError, host: ArgumentsHost) {
    const formattedErrors = exception.errors.map(err => ({
      path: err.path.join('.'),
      message: err.message,
    }));

    throw new BadRequestException({
      message: 'Validation failed', // <-- set a custom message
      errors: formattedErrors,
    });
  }
}
