import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './projects/projects.module';
import { ObservationsController } from './observations/observations.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://cs467-citi-sci:citizenScience467!@cluster1.wuags.mongodb.net/citizen-science',
      {
        useNewUrlParser: true,
      },
    ),
    ProjectModule,
  ],
  controllers: [AppController, ObservationsController],
  providers: [AppService],
})
export class AppModule {}
