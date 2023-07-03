import { BadRequestException, Injectable } from "@nestjs/common";
import { LoginDto } from "./dtos/login.dto";
import { MessagesHelper } from "./helpers/messages.helpers";

@Injectable()
export class AuthService {
    login(dto: LoginDto) {
        if(dto.login !== 'teste@teste.com' || dto.password !== 'teste@123'){
            throw new BadRequestException(MessagesHelper.AUTH_PASSOWORD_OR_LOGIN_NOT_FOUND);
        }

        return dto;
    }
}