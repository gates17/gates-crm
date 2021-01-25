import { UserRolesGuard } from './user-role/user-role.guard';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

import { UsersModule } from './users/users.module';
import { UserRoleController } from './user-role/user-role.controller';
import { UserRoleModule } from './user-role/user-role.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, AuthModule, UserRoleModule],
  controllers: [AppController, UserRoleController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    /* {
      provide: APP_GUARD,
      useClass: UserrRolesGuard,
    }, */
  ],
})
export class AppModule {}
