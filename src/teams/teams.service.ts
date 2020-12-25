import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Team } from './schema/teams.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TeamsService {
  constructor(@InjectModel(Team.name) private teamModel: Model<Team>) {}

  async list(): Promise<Team[]> {
    return this.teamModel.find();
  }
}
