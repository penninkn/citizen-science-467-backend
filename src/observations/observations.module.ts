import { ObservationController } from './observations.controller';
import { ObservationService } from './observations.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Observation, ObservationSchema } from './observations.schema';
import { ProjectModule } from 'src/projects/projects.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Observation.name, schema: ObservationSchema },
    ]),
    ProjectModule,
    UsersModule,
  ],
  providers: [ObservationService],
  controllers: [ObservationController],
})
export class ObservationsModule {}
