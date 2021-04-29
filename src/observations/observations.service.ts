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

  // Get a single project
  async getObservation(observationID): Promise<Observation> {
    const observation = await this.observationModel.findById(observationID).exec();
    return observation;
  }

// Delete an Observation
async deleteObservation(observationID): Promise<any> {
  const deleteObservation = await this.observationModel.findByIdAndRemove(observationID);
  return deleteObservation;
}
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

}
