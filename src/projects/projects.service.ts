import { UpdateProjectDTO } from './update-project.dto';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProjectDTO } from 'src/projects/create-project.dto';
import { Project, ProjectDocument } from './project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  // fetch all projects
  async getAllProjects(): Promise<Project[]> {
    const projects = await this.projectModel.find().exec();
    return projects;
  }

  // Get a single project
  async getProject(projectID): Promise<Project> {
    const project = await this.projectModel.findById(projectID).exec();
    return project;
  }

  // post a single project
  async addProject(createProjectDTO: CreateProjectDTO): Promise<Project> {
    const newProject = new this.projectModel(createProjectDTO);
    return newProject.save();
  }

  // Edit Project details
  async updateProject(
    projectID: any,
    updateProjectDTO: UpdateProjectDTO,
  ): Promise<Project> {
    const updatedProject = await this.projectModel.findByIdAndUpdate(
      projectID,
      updateProjectDTO,
      { new: true },
    );
    return updatedProject;
  }

  // Delete a Project
  async deleteProject(projectID): Promise<any> {
    const deletedProject = await this.projectModel.findByIdAndRemove(projectID);
    return deletedProject;
  }

  async addProjectObservation(observationId, projectId): Promise<void> {
    await this.projectModel.findById(projectId).update({
      $push: {
        observations: observationId,
      },
    });
  }
}
