import { ObservationController } from './observations.controller';
import { ObservationService } from './observations.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Observation, ObservationSchema} from './observations.schema'
import { from } from 'rxjs';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Observation.name, schema: ObservationSchema }]),
  ],
  providers: [ObservationService],
  controllers: [ObservationController],
})
export class ObservationsModule {}