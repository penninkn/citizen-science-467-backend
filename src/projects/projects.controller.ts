import {
  Body,
  Controller,
  Get,
  Put,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateProjectDTO } from './create-project.dto';
import { ProjectService } from './projects.service';
import { UpdateProjectDTO } from './update-project.dto';

@UseGuards(AuthGuard())
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get('projects')
  async getAllProjects(@Res() res) {
    console.log('in get projects');
    const projects = await this.projectService.getAllProjects();
    return res.status(HttpStatus.OK).json(projects);
  }

  @Get('type')
  async GetByType(@Res() res, @Query() query) {
    const projects = await this.projectService.getProjectsByType(query);
    return res.status(HttpStatus.OK).json(projects);
  }

  @Get(':projectId')
  async getProject(@Res() res, @Param('projectId') projectId) {
    const project = await this.projectService.getProject(projectId);
    if (!project) throw new NotFoundException('Project does not exist!');
    return res.status(HttpStatus.OK).json(project);
  }

  @Put(':projectId')
  async updateProject(
    @Res() res,
    @Param('projectId') projectId,
    @Body() updateProjectDTO: UpdateProjectDTO,
  ) {
    const updatedProject = await this.projectService.updateProject(
      projectId,
      updateProjectDTO,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Project has been updated successfully',
      updatedProject,
    });
  }

  // addProject? JN
  @Post('/create')
  async addCustomer(@Res() res, @Body() createProjectDTO: CreateProjectDTO) {
    const project = await this.projectService.addProject(createProjectDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Project has been created successfully',
      project,
    });
  }
}
