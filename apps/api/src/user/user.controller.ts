import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { EditUser } from './dto/edituser.dto';
import { ReqUser } from 'src/types/requser.type';
import { JwTGuard } from 'src/auth/guards/jwt.guard';
import { AbilityGuard } from 'src/ability/abilities.guard';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Action } from 'src/ability/ability.factory';
import { IsPublic } from 'src/auth/decorator/ispublic.decorator';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUser } from './dto/createuser.dto';
@UseGuards(JwTGuard, AbilityGuard)
@Controller('user')
export class UserController {
    //TODO Refactor
    constructor(private userService: UserService) {}
    @CheckAbilities({ action: Action.Read, subject: 'User' })
    @Get('')
    async listAllUsers(@GetUser() user: ReqUser) {
        return await this.userService.listAllUsers(user);
    }

    @CheckAbilities({ action: Action.Read, subject: 'User' })
    @Get(':id')
    async getUserById(@Param('id') id: string, @GetUser() user: ReqUser) {
        return await this.userService.getUserById(id, user);
    }

    @CheckAbilities({ action: Action.Update, subject: 'User' })
    @Patch(':id')
    async editUserById(
        @Param('id') id: string,
        @Body() dto: EditUser,
        @GetUser() user: ReqUser,
    ) {
        return await this.userService.editUserById(id, dto, user);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string, @GetUser() user: ReqUser) {
        return await this.userService.deleteUser(id, user);
    }

    @CheckAbilities({ action: Action.Create, subject: 'User' })
    @IsPublic()
    @Post()
    async createMember(@Body() dto: CreateUser, @GetUser() user: ReqUser) {
        return await this.userService.createUser(user, dto);
    }

    @Patch('change-password')
    async changePassword(@Body() dto: EditUser, @GetUser() user: ReqUser) {
        return await this.userService.changePassword(dto, user);
    }

    @Patch('reset-password')
    async postRestPassword(@GetUser() user: ReqUser, @Body() dto: EditUser) {
        return await this.userService.reset_password(dto, user);
    }
    //TODO Fazer o delete

    @Get('permissions')
    async getPermissions(@GetUser() user: ReqUser) {
        return await this.userService.getPermissions(user);
    }
}
