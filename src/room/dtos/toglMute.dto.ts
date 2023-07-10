import { IsBoolean, IsString } from "class-validator";
import { RoomMessagesHelper } from "../helpers/roommessages.helper";
import { JoimRoomDto } from "./joinroom.dto";

export class ToglMuteDto extends JoimRoomDto {

    @IsBoolean({message: RoomMessagesHelper.MUTED_NOT_VALID})
    muted: boolean;
}