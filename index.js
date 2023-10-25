import express from 'express'
import http from 'http2'
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


io.on('connection' , (socket) => {

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


// this route added because of we need '/' route when we have to deploye the server 
app.get('/',(req,res)=>{
    res.send('Welcome to chat app')
})

server.listen(process.env.PORT, () => {
    console.log("Server is running  ")
})