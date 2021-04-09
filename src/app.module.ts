import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './projects/projects.module';

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
