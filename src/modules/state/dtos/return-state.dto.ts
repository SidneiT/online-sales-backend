import { StateEntity } from '../entities/state.entity';

export class ReturnStateDto {
  name: string;

  constructor({ name }: StateEntity) {
    this.name = name;
  }

  static map(users: StateEntity[]): ReturnStateDto[] {
    return users.map((user) => new ReturnStateDto(user));
  }
}
