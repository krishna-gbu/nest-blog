import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { BlogModule } from './blog/blog.module';
import { CommentModule } from './comment/comment.module';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://krishana:gFxqzoKv6qFyNHnq@cluster0.4zauzpp.mongodb.net/nestjs',
    ),
    UserModule,
    AdminModule,
    BlogModule,
    CommentModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
