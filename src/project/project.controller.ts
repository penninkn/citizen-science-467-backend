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
import { CreateProjectDTO } from './create-project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get('projects')
  async getAllProjects(@Res() res) {
    const projects = await this.projectService.getAllProjects();
    return res.status(HttpStatus.OK).json(projects);
  }

  @Get(':projectId')
  async getProject(@Res() res, @Param('projectId') projectId) {
    const project = await this.projectService.getProject(projectId);
    if (!project) throw new NotFoundException('Customer does not exist!');
    return res.status(HttpStatus.OK).json(project);
  }

  @Post('/create')
  async addCustomer(@Res() res, @Body() createProjectDTO: CreateProjectDTO) {
    console.log(createProjectDTO.title);
    const project = await this.projectService.addProject(createProjectDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Project has been created successfully',
      project,
    });
  }
}
