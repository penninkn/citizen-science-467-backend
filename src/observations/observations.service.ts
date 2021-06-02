import { UpdateObservationDTO } from './update-observation.dto';
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
    const observations = await this.observationModel
      .find()
      .populate('user')
      .populate('project')
      .exec();
    return observations;
  }

  // Get a single observation
  async getObservation(observationID): Promise<Observation> {
    const observation = await this.observationModel
      .findById(observationID)
      .populate('user')
      .populate('project')
      .exec();
    return observation;
  }

  // Delete an Observation
  async deleteObservation(observationID): Promise<any> {
    const deleteObservation = await this.observationModel.findByIdAndRemove(
      observationID,
    );
    return deleteObservation;
  }
  // Create a new observation
  async addObservation(
    createObservationDTO: CreateObservationDTO,
  ): Promise<any> {
    const newObservation = new this.observationModel(createObservationDTO);
    return newObservation.save();
  }

  //   Edit an observation's details
  async updateObservation(
    observationID: any,
    updateObservationDTO: UpdateObservationDTO,
  ): Promise<Observation> {
    const updatedObservation = await this.observationModel.findByIdAndUpdate(
      observationID,
      updateObservationDTO,
      { new: true },
    );
    return updatedObservation;
  }

  async getObservationsByProject(projectId) {
    return await this.observationModel
      .find({ project: projectId })
      .populate('user')
      .populate('project');
  }

  //get all of a user's observations
  async getObservationsByUser(userId) {
    return await this.observationModel
      .find({ user: userId })
      .populate('user')
      .populate('project');
  }

  async getObservationsByProjectAndUser(projectId, userId) {
    return await this.observationModel
      .find({
        project: projectId,
        user: userId,
      })
      .populate('user')
      .populate('project');
  }
}
