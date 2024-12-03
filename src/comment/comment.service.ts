import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './comment.schema';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { mongoose_exception } from 'src/common/filters/mongoose_exception.filter';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  //create comment
  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      const newComment = new this.commentModel(createCommentDto);
      return await newComment.save();
    } catch (error) {
      mongoose_exception.handle(error);
    }
  }

  // read comment all comment
  async allComment(): Promise<Comment[]> {
    try {
      return await this.commentModel.find().exec();
    } catch (error) {
      mongoose_exception.handle(error);
    }
  }

  // read comment by id
  async getCommentById(commentId: string): Promise<Comment> {
    const comment = await this.commentModel
      .findById(commentId)
      .populate('blogId')
      .exec();

    if (!comment) {
      // Throw a NotFoundException if the comment does not exist
      throw new NotFoundException(`Comment ID is  not found`);
    }

    return comment;
  }

  // update comment by id
  async updateCommentById(
    commentId: string,
    CommentData: Partial<UpdateCommentDto>,
  ): Promise<Comment> {
    const updatedComment = await this.commentModel
      .findByIdAndUpdate(commentId, CommentData, { new: true })
      .exec();
    return updatedComment;
  }

  // delete comment by id
  async deleteCommentById(commentId: string): Promise<string> {
    await this.commentModel.findByIdAndDelete(commentId);
    return 'successfully Delete Comment';
  }

  // fetch blogs comments //
  async fetchCommentbyBlogId(blogId: string): Promise<Comment[]> {
    const allComments = await this.commentModel
      .find({ blogId: new mongoose.Types.ObjectId(blogId) })
      .populate('blogId')
      .exec();
    return allComments;
  }
}
