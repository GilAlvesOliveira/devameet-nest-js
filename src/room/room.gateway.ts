import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { RoomService } from './room.service';
import { Logger } from '@nestjs/common';
import { Server } from 'http';
import { Socket } from 'dgram';
import { UpdateUserPositionDto } from './dtos/updateposition.dto';
import { ToglMuteDto } from './dtos/toglMute.dto';

type activeSockersType = {
  room: String;
  id: string;
  userId: string;
}

@WebSocketGateway({cors: true})
export class RoomGateway implements OnGatewayInit, OnGatewayDisconnect {

  constructor(private readonly service: RoomService) {}

  @WebSocketServer() wss: Server;

  private logger = new Logger(RoomGateway.name);
  private activeSockers: activeSockersType[] = [];
  
  handleDisconnect(client: any) {
    this.logger.debug(`Client: ${client.id} disconnected`);
  }
  
  afterInit(server: any) {
    this.logger.log('Gateway initialized');
  }

  @SubscribeMessage('join')
  async handlerJoin(client: Socket, payload: JoinRoomDto) {
    const {link, userId} = payload;

    const existingOnSocket = this.activeSockers.find(
      socket => socket.room === link && socket.id === client.id);

      if(!existingOnSocket) {
        this.activeSockers.push({room: link, id: client.disconnect, userId});

        const dto = {
          link,
          userId,
          x: 2,
          y: 2,
          orientation: 'down'
        } as UpdateUserPositionDto

        await this.service.updateUserPosition(client.id, dto);
        const users = await this.service.listUsersPositionByLink(link);

        this.wss.emit(`${link}-update-user-list`, {users});
        client.broadcast.emit(`${link}-add-user`, {user: client.id});
      }

      this.logger.debug(`Socket client: ${client.id} start to join room ${link}`);
  }

  @SubscribeMessage('move')
  async handleMove(client: Socket, payload: UpdateUserPositionDto) {
    const {link, userId, x, y, orientation} = payload;
    const dto = {
      link,
      userId,
      x,
      y,
      orientation
    } as UpdateUserPositionDto

    await this.service.updateUserPosition(client.id, dto);
    const users = await this.service.listUsersPositionByLink(link);
    this.wss.emit(`${link}-update-user-list`, {users});
  }

  @SubscribeMessage('toggl-mute-user')
  async handleToglMute(_: Socket, payload: ToglMuteDto) {
    const {link} = payload;

    await this.service.updateUserMute(payload);
    const users = await this.service.listUsersPositionByLink(link);
    this.wss.emit(`${link}-update-user-list`, {users});
  }
}
