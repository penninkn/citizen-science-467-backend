import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from 'src/project/project.interface';
import { CreateProjectDTO } from 'src/project/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('Project') private readonly projectModel: Model<Project>,
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
    createProjectDTO: CreateProjectDTO,
  ): Promise<Project> {
    const updatedProject = await this.projectModel.findByIdAndUpdate(
      projectID,
      createProjectDTO,
      { new: true },
    );
    return updatedProject;
  }

  // Delete a Project
  async deleteProject(projectID): Promise<any> {
    const deletedProject = await this.projectModel.findByIdAndRemove(projectID);
    return deletedProject;
  }
}
