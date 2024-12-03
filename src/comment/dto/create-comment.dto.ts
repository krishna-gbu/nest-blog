import { IsString, IsMongoId, IsNotEmpty, isNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  readonly author: string;

  @IsMongoId()
  @IsNotEmpty()
  blogId: string;
}
