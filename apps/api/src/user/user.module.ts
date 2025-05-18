import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [AbilityModule],
})
export class UserModule {}
