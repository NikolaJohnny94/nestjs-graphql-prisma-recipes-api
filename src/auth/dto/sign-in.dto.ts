//GraphQL
import { InputType, Field } from '@nestjs/graphql';
//Class Validator
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class SignInDTO {
  @Field({
    description: 'The email address of the user attempting to sign in.',
  })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @Field({ description: "The password associated with the user's account." })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
