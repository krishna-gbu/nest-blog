import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { Model } from 'mongoose';
import { ErrorWrapper } from 'src/common/decorators/error-wrapper.decorator';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
  ) {}

  // create blogs //
  @ErrorWrapper()
  async createBlog(blogData: Partial<Blog>): Promise<Blog> {
    const newblog = new this.blogModel(blogData);
    return newblog.save();
  }
  // read blog //
  async readBlog(): Promise<Blog[]> {
    const allBlogs = await this.blogModel.find().exec();
    return allBlogs;
  }
  // update blog //
  async updateBlog(id: String, blogDate: Partial<Blog>): Promise<Blog> {
    const upatedBlog = await this.blogModel
      .findByIdAndUpdate(id, blogDate, { new: true })
      .exec();
    return upatedBlog;
  }

  // update blog //
  async blogById(id: string): Promise<Blog> {
    const getBlog = await this.blogModel.findById(id).exec();
    return getBlog;
  }

  // delete blog //
  async deleteBlog(id: string): Promise<string> {
    const deleteBlog = await this.blogModel.findByIdAndDelete(id).exec();
    return 'deleted successfully';
  }
}
