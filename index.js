import express from 'express'
import http from 'http'
import cors from 'cors'
import env from 'dotenv'
import { Server } from 'socket.io'

env.config()
const app = express();
app.use(cors());

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: process.env.ORIGIN,
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {

    socket.on('join', (data) => {
        socket.join(JSON.stringify(data));
        console.log('connected user :', socket.id, 'chat ID : ', data)
    })

    socket.on('message', (data) => {
        socket.broadcast.emit('receive', data);
        console.log(data)
    })

    socket.on('disconnect', (socket) => {
        console.log('User disconnected')
    })
})

server.listen(process.env.PORT, () => {
    console.log("Server is running  ")
})