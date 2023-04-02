import { CreateUserDto } from "src/user/dto/create_user.dto";

export class CreateProfileDto extends CreateUserDto {
    readonly name: string;
    readonly surname: string;
    readonly phone: string;
}