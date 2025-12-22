import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwTRefreshGuard extends AuthGuard('jwt-refresh') {}
