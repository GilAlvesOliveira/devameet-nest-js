import { IsBoolean, IsString } from "class-validator";
import { RoomMessagesHelper } from "../helpers/roommessages.helper";
import { JoinRoomDto } from "./joinroom.dto";

export class ToglMuteDto extends JoinRoomDto {

    @IsBoolean({message: RoomMessagesHelper.MUTED_NOT_VALID})
    muted: boolean;
}