
import { io } from "socket.io-client";

const socket = io("http://127.0.0.1:4041");

socket.on('connect', function () {
    console.log("socket connected");
});

socket.emit('newAlarm', {
    vesselId: "682877ba-fd93-4e1f-a655-163985cf8533",
    message: "Heeeeelp!!!",
    timestamp: "NNN"
});