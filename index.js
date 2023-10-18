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

    socket.on('join', () => {
        socket.join();
    })

    socket.on('message', (data) => {
        socket.broadcast.emit('receive', data);
    })

    socket.on('disconnect', (socket) => {
        console.log('User disconnected')
    })
})

server.listen(process.env.PORT, () => {
    console.log("Server is running  ")
})