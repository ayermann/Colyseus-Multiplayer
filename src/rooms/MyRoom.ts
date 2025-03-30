import { Room, Client } from "@colyseus/core";
import { MyRoomState, Player } from "./schema/MyRoomState";

export type PositionMessage = {
  x: number,
  y: number
}

export class MyRoom extends Room<MyRoomState> {
  maxClients = 4;
  state = new MyRoomState();

  onCreate (options: any) {
    this.onMessage("type", (client, message) => {
      //
      // handle "type" message
      //
    });
  }

  onJoin (client: Client, options: any) {
     this.state.players.set(client.sessionId, new Player());


    // Listen to position changes from the client.
    this.onMessage("position", (client, position: PositionMessage) => {
      const player = this.state.players.get(client.sessionId);
      player.x = position.x;
      player.y = position.y;
      console.log({position})
    });

    client.send("on_room_joined");
    this.broadcast("on_guest_joined", client.sessionId, { except: client });
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
