import { IsOptional, IsString, IsMongoId } from 'class-validator';

export class UpdateCommentDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsMongoId()
  blogId?: string;
}
