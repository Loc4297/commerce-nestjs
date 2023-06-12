import { Module } from '@nestjs/common';
import { dataSourceOptions } from './database/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { SkillModule } from './skills/skill.module';
import { LevelModule } from './levels/level.module';
import { CourseModule } from './courses/course.module';
import { CouponModule } from './coupons/coupon.module';
import { CartModule } from './carts/cart.module';
import { AuthenticationModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    SkillModule,
    LevelModule,
    CourseModule,
    CouponModule,
    CartModule,
    AuthenticationModule,
    PrismaModule,
  ],
})
export class AppModule {}
