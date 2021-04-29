import {
    Body,
    Controller,
    Get,
    Delete,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Res,
} from '@nestjs/common';


import { ObservationService } from './observations.service';
import { CreateObservationDTO } from './create-observation.dto';
  
    
  @Controller('observation')
  export class ObservationController {
    constructor(private observationService: ObservationService) {}
  
    @Get('observations')
    async getAllObservations(@Res() res) {
      const observations = await this.observationService.getAllObservations();
      return res.status(HttpStatus.OK).json(observations);
    }
  
    @Get(':observationId')
    async getObservation(@Res() res, @Param('observationId') observationId) {
      const observation = await this.observationService.getObservation(observationId);
      if (!observation) throw new NotFoundException('Observation does not exist!');
      return res.status(HttpStatus.OK).json(observation);
    }

    @Delete(':observationId')
    async deleteObservation(@Res() res, @Param('observationId') observationId) {
      const observation = await this.observationService.deleteObservation(observationId);
      if (!observation) throw new NotFoundException('Observation does not exist!');
      return res.status(HttpStatus.OK).json(observation);
      // Project does not exist? JN
    }
  
    // addProject? JN
    @Post('/create')
    async addObservation(@Res() res, @Body() CreateObservationDTO: CreateObservationDTO) {
      const observation = await this.observationService.addObservation(CreateObservationDTO);
      return res.status(HttpStatus.OK).json({
        message: 'Project has been created successfully',
        observation,
      });
    }
  }
  