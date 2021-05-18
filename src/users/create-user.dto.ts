import { Observation } from 'src/observations/observations.schema';

export class CreateUserDTO {
  readonly first_name: string;
  readonly last_name: string;
  readonly username: string;
  readonly age: number;
  readonly email: string;
  readonly password: string;
  readonly admin: boolean;
  readonly created_at: Date;
}
