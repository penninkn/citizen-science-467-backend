import {
  Body,
  Controller,
  Get,
  Put,
  Delete,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CreateObservationDTO } from './create-observation.dto';
import { ObservationService } from './observations.service';

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
    const observation = await this.observationService.getObservation(
      observationId,
    );
    if (!observation)
      throw new NotFoundException('Observation does not exist!');
    return res.status(HttpStatus.OK).json(observation);
  }

  @Delete(':observationId')
  async deleteObservation(@Res() res, @Param('observationId') observationId) {
    const observation = await this.observationService.deleteObservation(
      observationId,
    );
    if (!observation)
      throw new NotFoundException('Observation does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Project has been deleted successfully',
      observation,
    });
  }

  @Put(':observationId')
  async updateObservation(
    @Res() res,
    @Param('observationId') observationId,
    @Body() createObservationDTO: CreateObservationDTO,
  ) {
    const updatedObservation = await this.observationService.updateObservation(
      observationId,
      createObservationDTO,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Project has been updated successfully',
      updatedObservation,
    });
  }

  @Post('/create')
  async addObservation(
    @Res() res,
    @Body() createObservationDTO: CreateObservationDTO,
  ) {
    const observation = await this.observationService.addObservation(
      createObservationDTO,
    );

    // TODO: add code to add new observationID to user observations list.
    return res.status(HttpStatus.OK).json({
      message: 'Project has been created successfully',
      observation,
    });
  }
}
