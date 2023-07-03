import { IsEmail, IsNotEmpty } from "class-validator";
import { MessagesHelper } from "../helpers/messages.helpers";

export class LoginDto {
    @IsEmail({}, {message: MessagesHelper.AUTH_LOGIN_NOT_FOUND})
    login: string;

    @IsNotEmpty({message: MessagesHelper.AUTH_PASSOWORD_NOT_FOUND})
    password: string;
}