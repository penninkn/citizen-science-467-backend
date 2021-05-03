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

  // Get all observations
  async getAllObservations(): Promise<Observation[]> {
    const observations = await this.observationModel.find().exec();
    return observations;
  }

  // Get a single observation
  async getObservation(observationID): Promise<Observation> {
    const observation = await this.observationModel.findById(observationID).exec();
    return observation;
  }

// Delete an Observation
async deleteObservation(observationID): Promise<any> {
  const deleteObservation = await this.observationModel.findByIdAndRemove(observationID);
  return deleteObservation;
}
  // Create a new observation
  async addObservation(CreateObservationDTO: CreateObservationDTO): Promise<Observation> {
    const newObservation = new this.observationModel(CreateObservationDTO);
    return newObservation.save();
  }

  // Edit an observation's details
  async updateObservation(
    observationID: any ,
    createObservationDTO: CreateObservationDTO,
  ): Promise<Observation> {
    const updatedObservation = await this.observationModel.findByIdAndUpdate(
      observationID,
      createObservationDTO,
      { new: true },
    );
    return updatedObservation;
  }

}