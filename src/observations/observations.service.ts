import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateObservationDTO } from './create-observation.dto';
import { Observation, ObservationDocument } from './observations.schema';


@Injectable()
export class ObservationService {
  constructor(
    @InjectModel(Observation.name)
    private readonly observationModel: Model<ObservationDocument>,
  ) {}

  // fetch all projects
  async getAllObservations(): Promise<Observation[]> {
    const observations = await this.observationModel.find().exec();
    return observations;
  }

//   // Get a single project
//   async getProject(projectID): Promise<Project> {
//     const project = await this.projectModel.findById(projectID).exec();
//     return project;
//   }

  // post a single project
  async addObservation(CreateObservationDTO: CreateObservationDTO): Promise<Observation> {
    const newObservation = new this.observationModel(CreateObservationDTO);
    return newObservation.save();
  }

//   // Edit Project details
//   async updateProject(
//     projectID: any,
//     createProjectDTO: CreateProjectDTO,
//   ): Promise<Project> {
//     const updatedProject = await this.projectModel.findByIdAndUpdate(
//       projectID,
//       createProjectDTO,
//       { new: true },
//     );
//     return updatedProject;
//   }

//   // Delete a Project
//   async deleteProject(projectID): Promise<any> {
//     const deletedProject = await this.projectModel.findByIdAndRemove(projectID);
//     return deletedProject;
//   }
}
