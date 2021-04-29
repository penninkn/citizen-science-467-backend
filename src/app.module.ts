import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { ProjectModule } from './projects/projects.module';
import { ObservationsModule } from './observations/observations.module';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ObservationController } from './observations/observations.controller';
import { ObservationService } from './observations/observations.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://cs467-citi-sci:citizenScience467!@cluster1.wuags.mongodb.net/citizen-science',
      {
        useNewUrlParser: true,
      },
    ),
    ProjectModule,
    ObservationsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
