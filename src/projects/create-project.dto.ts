import { Observation } from 'src/observations/observations.schema';

export class CreateProjectDTO {
  readonly title: string;
  readonly created_at: Date;
  readonly description: string;
  readonly type: string;
  readonly observations: Observation[];
  readonly active: boolean;
}
