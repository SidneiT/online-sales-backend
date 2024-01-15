import { UserEntity } from 'src/modules/user/entities/user.entity';

export class TokenPayloadDto {
  id: number;
  typeUser: number;

  constructor({ id, typeUser }: UserEntity) {
    this.id = id;
    this.typeUser = typeUser;
  }
}
