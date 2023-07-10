import { IsNotEmpty } from "class-validator";
import { RoomMessagesHelper } from "../helpers/roommessages.helper";


export class JoimRoomDto {

    @IsNotEmpty({message: RoomMessagesHelper.JOIM_USER_NOT_VALID})
    userId: string;

    @IsNotEmpty({message: RoomMessagesHelper.JOIM_LINK_NOT_VALID})
    link: string;
}