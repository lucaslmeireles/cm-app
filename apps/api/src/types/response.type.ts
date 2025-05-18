import { HttpStatus } from '@nestjs/common';

export type ResponseType<T> = {
  statusCode: number | HttpStatus;
  message: string;
  data?: T;
};
