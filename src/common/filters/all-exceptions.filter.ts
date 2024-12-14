//Common
import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';
//Prisma
import { Prisma } from '@prisma/client';
//GraphQL
import { GraphQLError } from 'graphql';
//Utils
import { handlePrismaError } from './utils/handlePrismaErrors.util';

export type HttpExceptionResponsePayload = {
  message: string | string[];
  error: string;
  statusCode: number;
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: any) {
    let message: string | string[] = 'Internal server error';
    let code: string = 'INTERNAL_SERVER_ERROR';

    if (exception instanceof HttpException) {
      message = (exception.getResponse() as HttpExceptionResponsePayload)
        .message;
      code = (exception.getResponse() as HttpExceptionResponsePayload).error;
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const {
        message: customPrismaClientMessage,
        code: customPrismaExceptionCode,
      } = handlePrismaError(exception);

      message = customPrismaClientMessage;
      code = customPrismaExceptionCode;
    }

    console.error(exception);

    throw new GraphQLError(message as string, {
      extensions: {
        code,
        prismaExceptionCode: exception.code,
        timeStamp: new Date().toISOString(),
      },
    });
  }
}
