import React, { useState, useEffect, useCallback } from "react";
import { useSocket } from "../context/SocketContext";
import { Grid, Card, CardContent, CardHeader, Avatar, Typography, CardActions, IconButton } from "@mui/material";
import { blue, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Default from "../components/layouts/Default";
import axios from "axios";
import Login from "../components/forms/Login"
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useUser } from "../context/userContext";

export default function Messages({ messages: data, oldMessages }) {
    const socket = useSocket();
    const [messages, setMessages] = useState(data || []);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { enqueueSnackbar } = useSnackbar();
    const { user, token } = useUser()


    const addMessage = useCallback((message) => {
        setMessages((others) => [message, ...others]);
    }, []);
    useEffect(() => {
        socket.on("addMessage", addMessage);
        //socket.on("updateMessage", updateMessage);
        return () => {
            socket.off("addMessage", addMessage);
        };
    }, [addMessage, socket]);


    const onSubmit = (data) => {

        axios.post('http://localhost:5000/messages', data, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then((res) => {
                console.log(res)
                if (res.status != 201) {
                    enqueueSnackbar('Error')
                    console.log(errors);
                } else {
                    enqueueSnackbar('Message created')
                }
            })
    };
    return (
        <div>
            <Default>
                {!user &&
                    <div>
                        <p>Veuillez vous connecter pour poster un message</p>
                        <Login />
                    </div>}
                {user !== null &&
                    <div style={{ width: '100%', display: 'flex', justifyContent: "space-around", flexDirection: "column", alignItems: 'center' }}>
                        <h3>Poster un message</h3>
                        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', justifyContent: "space-around", flexDirection: "column", alignItems: 'center' }}>
                            <textarea rows={4} placeholder="Poster un message" {...register("content", { required: true, maxLength: 80 })} />
                            <input type="submit" style={{ background: "rgb(33 231 30)", border: 'none', marginBottom: '15px' }} />
                        </form>
                    </div>}
                {messages.length == 0 && <p style={{ textAlign: 'center', margin: '10px' }}>Pas de nouveaux messages</p>}
                {messages != null && messages.map((message) => {
                    return (
                    <Card style={{ margin: '20px auto' }} key={message.id}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[100] }} aria-label="recipe" src={message.author.avatar}>
                                    R
                                </Avatar>
                            }
                            title={message.author != null && message.author.username}
                            subheader={message.date}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {message.content != null && message.content}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                )})}
                <h3 className="text-center font-bold text-xl">Anciens messages</h3>
                {oldMessages != null && oldMessages.map((message) => (
                    <Card style={{ margin: '20px auto' }} key={message.id}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe" src={message.author}>
                                    R
                                </Avatar>
                            }
                            title={message.author != null && message.author.username}
                            subheader={message.date}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {message.content != null && message.content}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                ))}
            </Default>
        </div>

    )
}
export async function getStaticProps() {

    const response = await axios.get('http://localhost:5000/messages')
    console.log(response)
    const results = response.data
    const oldMessages = results.map(perso => {
        return {
            id: perso._id.toString(),
            content: perso.content,
            date: perso.date,
            author: perso.author
        }
    })
    return {
        props: {
            oldMessages
        }
    }
}