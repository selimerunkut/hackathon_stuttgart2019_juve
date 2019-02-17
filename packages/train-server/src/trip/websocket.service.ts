import { SubscribeMessage, WebSocketGateway, WsResponse, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';

@WebSocketGateway(3100)
export class WebsocketService implements OnGatewayConnection {

    @WebSocketServer() public wss;

    handleConnection(client: any, ...args: any[]) {
        
    }

    public sendEvent(event: any) {
        this.wss.emit('message', event);
    }

}