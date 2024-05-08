import * as ETA from "https://deno.land/x/eta@v3.1.1/src/index.ts";
import {Player} from "./src/player.ts"
import { Room } from "./src/room.ts";

const eta = new ETA.Eta({views: "./views"});

Deno.serve(requestHandler);
setInterval(tick, 1000);

const gameRunning = true;
const players: Player[] = [];
const rooms = [];

const watercooler = new Room("The Watercooler",
"You're standing near a watercooler in a non-descript office building.", "At the watercooler.");
rooms.push(watercooler);

async function requestHandler(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const params = new URLSearchParams(url.searchParams);

    switch(url.pathname) {
        case "/": {
            const name = params.get("name");
            const html = eta.render("./index", {
                name: name, 
                numPlayers: players.length, 
                gameRunning: gameRunning ? "running" : "stopped"
            });
            return new Response(html, {headers : new Headers({"content-type" : "text/html"})})
        }
        case "/players": {
            if (req.method !== "POST") {
                return new Response(null, {status:405});
            }
            const formData = await req.formData();
            const playerName = formData.get("playerName");
            return new Response(playerName);
        }
        default:
            return new Response(null, {status:404});
    }
}

// run once per second to do server side things
function tick () {

}