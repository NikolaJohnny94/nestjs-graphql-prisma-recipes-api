//GraphQL
import { InputType, PartialType } from '@nestjs/graphql';
//DTO
import { CreateUserDTO } from 'src/shared/dto/create-user.dto';

@InputType()
export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
