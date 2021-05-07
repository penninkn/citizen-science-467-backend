export class CreateObservationDTO {
  readonly title: string;
  readonly text: string;
  readonly city: string;
  readonly state: string;
  readonly latitude: string;
  readonly longitude: string;
  readonly date: Date;
  readonly project: string;
  readonly user: string;
}
