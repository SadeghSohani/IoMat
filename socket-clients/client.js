
import { io } from "socket.io-client";

const socket = io("http://127.0.0.1:4041");

socket.on('connect', function () {
    console.log("socket connected");
});

socket.emit('clientJoin', { userEmail: 'user3@iomat.com' });

socket.on('alarm', function(data) {
    console.info(data)
});
