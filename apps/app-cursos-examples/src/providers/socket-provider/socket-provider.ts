import { OnEvent } from "@nestjs/event-emitter";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { JwtHandle } from "../../auth/utils/jwt-handle/jwt-handle";

@WebSocketGateway({
    cors : {
        origin : ['*']
    }
})
export class SocketProvider implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    constructor(private jwtHandle: JwtHandle){

    }


    @WebSocketServer() serverGlobal: Socket;

    /**
     * Esta funcion se encarga de escuchar el evento 'join' que emite el front
     * 
     * */
    @SubscribeMessage('join')
    handleJoin(io: Socket, token: string){ // TODO salas "rooms"
        const {id} = this.jwtHandle.getIdByToken(token);
        io.join(`__room__${id}`);
        // console.log('____', id);
        // console.log(io.id);
        console.log('Se unio el dispositivo..', id);
    }

    @OnEvent('video.created')
    getVideo(video: any){
        this.serverGlobal.emit('video.created', video);
    }

    @OnEvent('video_user.created')
    sendVideosToUser(data: {video: any, id: string}){
        this.serverGlobal.to(`__room__${data.id}`).emit('video.created', data.video);
    }

    afterInit(server: any) { // TODO Se llama cuando se inicia el servicio de WS
        console.log('_SOCKET INICIALIZADO: ', server);
    }

    handleConnection(client: any, ...args: any[]) { // TODO Se llama cuando un cliente se conecta
        console.log('_Un cliente se conecto_: ', client.id);
    }

    handleDisconnect(client: any) { //TODO Cuando un cliente se conecta
        console.log('_Un cliente se desconecto_: ', client.id);
    }
}
