import { Schema, MapSchema, type } from "@colyseus/schema";

export class Player extends Schema {

  @type("int8") x: number = 0;
  @type("int8") y: number = 0;

}

export class MyRoomState extends Schema {
	@type({map: Player})
	players: MapSchema<Player> = new MapSchema<Player>();
}
