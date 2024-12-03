import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './comment.schema';
import { ErrorWrapper } from 'src/common/decorators/error-wrapper.decorator';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { MongooseValidateObjectIdPipe } from 'src/common/pipes/MongooseValidateObjectIdPipe';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  //create comment

  @Post('/create')
  @ErrorWrapper()
  async createComment(
    @Body(new ValidationPipe()) createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentService.createComment(createCommentDto);
  }

  // get all comment //
  @Get('/all')
  async getAllComment(): Promise<Comment[]> {
    return this.commentService.allComment();
  }

  //get comment by id
  @Get('/:id')
  async getCommentById(
    @Param('id', new MongooseValidateObjectIdPipe()) id: string,
  ): Promise<Comment> {
    return this.commentService.getCommentById(id);
  }

  // update comment by commentID
  @Put('/:id')
  async updateComment(
    @Param('id', new MongooseValidateObjectIdPipe()) commentID: string,
    @Body(new ValidationPipe()) commentData: UpdateCommentDto,
  ): Promise<Comment> {
    return this.commentService.updateCommentById(commentID, commentData);
  }

  // read comment //
  @Get('/byblog/:id')
  async getCommentbyBlog(@Param('id') blogId: string): Promise<Comment[]> {
    return this.commentService.fetchCommentbyBlogId(blogId);
  }

  // delete comment by id  //
  @Delete('/:id')
  async deleteBlog(@Param('id') deleteID: string): Promise<string> {
    this.commentService.deleteCommentById(deleteID);
    return 'successfully deletated comment';
  }
}
