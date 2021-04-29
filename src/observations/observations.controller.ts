import {
    Body,
    Controller,
    Get,
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
  
    // @Get(':projectId')
    // async getProject(@Res() res, @Param('projectId') projectId) {
    //   const project = await this.projectService.getProject(projectId);
    //   if (!project) throw new NotFoundException('Customer does not exist!');
    //   return res.status(HttpStatus.OK).json(project);
    //   // Project does not exist? JN
    // }
  
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
  