import { SubscribeMessage, WebSocketGateway, WsResponse, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';

@WebSocketGateway(3100)
export class WebsocketService implements OnGatewayConnection {

    @WebSocketServer() public wss;

    handleConnection(client: any, ...args: any[]) {
        return ;
        client.emit('hello')
        client.on('message', (msg) => {
            console.log(msg);
        });
    }
}