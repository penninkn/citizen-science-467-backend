import { CreateObservationDTO } from './create-observation.dto';
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



@Controller('observations')
export class ObservationsController {
    @Get()
    findAll(): string {
        return 'get all observations';
    }

    @Post()
    create(@Body() CreateObservationDTO: CreateObservationDTO): string {
        return `Name: ${CreateObservationDTO.title} Text: ${CreateObservationDTO.text}`;
    }

}
