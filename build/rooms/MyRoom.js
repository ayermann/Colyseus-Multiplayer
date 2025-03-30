"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoom = void 0;
const core_1 = require("@colyseus/core");
const MyRoomState_1 = require("./schema/MyRoomState");
class MyRoom extends core_1.Room {
    constructor() {
        super(...arguments);
        this.maxClients = 4;
        this.state = new MyRoomState_1.MyRoomState();
    }
    onCreate(options) {
        this.onMessage("type", (client, message) => {
            //
            // handle "type" message
            //
        });
    }
    onJoin(client, options) {
        this.state.players.set(client.sessionId, new MyRoomState_1.Player());
        // Listen to position changes from the client.
        this.onMessage("position", (client, position) => {
            const player = this.state.players.get(client.sessionId);
            player.x = position.x;
            player.y = position.y;
            console.log({ position });
        });
        client.send("on_room_joined");
        this.broadcast("on_guest_joined", client.sessionId, { except: client });
    }
    onLeave(client, consented) {
        console.log(client.sessionId, "left!");
    }
    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
exports.MyRoom = MyRoom;
