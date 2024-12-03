import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BlogService } from './blog.services';
import { Blog } from './blog.schema';

@Controller('/blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/allblogs')
  async findAll(): Promise<Blog[]> {
    return this.blogService.readBlog();
  }

  @Post('/create')
  async createBlog(@Body() blogData: Partial<Blog>) {
    return this.blogService.createBlog(blogData);
  }

  @Put('/:id')
  async updateBlog(
    @Param('id') id: string,
    @Body() blogData: Partial<Blog>,
  ): Promise<Blog> {
    return this.blogService.updateBlog(id, blogData);
  }

  @Get('/:id')
  async getBlogById(@Param('id') id: string): Promise<Blog> {
    return this.blogService.blogById(id);
  }

  @Delete('/:id')
  async deleteBlog(@Param('id') id: string): Promise<string> {
    return this.blogService.deleteBlog(id);
  }
}
