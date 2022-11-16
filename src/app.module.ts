import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest_sample', {
      autoIndex: true,
    }),
    AuthModule,
    UserModule,
    BookmarkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
// 26
