export class CreateUserDTO {
  readonly first_name: string;
  readonly last_name: string;
  readonly username: string;
  readonly age: number;
  readonly email: string;
  password: string;
  readonly admin: boolean;
}
