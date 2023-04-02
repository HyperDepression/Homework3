import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModule } from './user/user.module';
import { RoleModule } from "./role/role.module";
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from "@nestjs/config";
import { User } from "./user/user.model";
import { Role } from "./role/role.model";
import { Profile } from "./profile/profile.model";
import { UserRole } from "./role/user_role.model";
import { TextBlock } from "./text_block/text_block.model";
import { File } from "./file/file.model";
import { FileModule } from "./file/file.module";
import { TextBlockModule } from "./text_block/text_block.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),        
        ServeStaticModule.forRoot({
            rootPath: path.resolve( __dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            models: [User, Profile, Role, UserRole, TextBlock, File],
            autoLoadModels: true,
            omitNull: false
        }),
        UserModule,
        ProfileModule,
        RoleModule,
        AuthModule,
        FileModule,
        TextBlockModule
    ]
})
export class AppModule { }