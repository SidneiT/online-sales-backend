import { StateEntity } from '../entities/state.entity';

export class ReturnStateDto {
  id: number;
  name: string;

  constructor({ id, name }: StateEntity) {
    this.id = id;
    this.name = name;
  }

  static map(users: StateEntity[]): ReturnStateDto[] {
    return users.map((user) => new ReturnStateDto(user));
  }
}
