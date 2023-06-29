
import React, { useEffect, useState } from 'react'
import { getApi } from '../../utils/axiosConfig';
import { Alert, Avatar, Button, Card, CardContent, Chip, FormGroup, IconButton, TextField, Typography, Badge, Tooltip } from '@mui/material';
import Text from '@mui/material/Typography';
import { TimeStampToDate } from '../../utils/Helper';
import SendIcon from '@mui/icons-material/Send';
import RefreshIcon from '@mui/icons-material/Refresh';
import UserDetailsDialog from '../UserDetailDialog/UserDetailsDialog';
import './PostMessagesList.css'
import { motion } from 'framer-motion';

export default function PostMessagesList({ postId }) {


    const api = getApi();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const [userDetailDialogOpen, setUserDetailDialogOpen] = useState(false);
    const [userDetailUser, setUserDetailsUser] = useState({});

    const handleUserDetailDialogOpen = (user) => {
        setUserDetailsUser(user);
        setUserDetailDialogOpen(true);
    };

    useEffect(() => {

        const fetchPostMessageData = async () => {

            setIsLoading(true);

            //Message List for this post

            api.get(`api/v1/message/${postId}`)
                .then((response) => {
                    const messageList = response.data;
                    console.log(messageList);

                    //For testing add same message 10 times
                    // for (let i = 0; i < 10; i++) {
                    //     messageList.push(messageList[0]);
                    // }

                    setMessageList(messageList);
                })
                .catch((error) => {
                    if (error.response && error.response.status == 403) {
                        handleNavigateToLogin();
                        return;
                    }
                    setError(error.response.data.message);
                })
                .finally(() => {
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1000);
                });

        }

        fetchPostMessageData();

    }, [refresh]);


    const handelMessageSend = (event) => {

        event.preventDefault();

        setIsLoading(true);

        const message = {
            postId: postId,
            message: event.target.message.value,
        }

        console.log(message);

        api.post(`api/v1/message/${postId}`, message)
            .then(function (response) {
                console.log(response);
                setRefresh(true);
            })
            .catch(function (error) {
                if (error.response && error.response.status == 403) {
                    handleNavigateToLogin();
                    return;
                }
                setError(error.response.data.message);
                event.target.message.value = '';
            })
            .finally(function () {
                setIsLoading(false);
            });

    }


    return (
        <div className='w-100 h-100'>
            {
                isLoading &&
                <div className='d-flex justify-content-center align-items-center w-100 h-100'
                    style={{ 'backgroundColor': 'gray', 'borderRadius': '8px' }}>
                    <Alert severity="info" >Loading Comments</Alert>
                </div>
            }
            {
                error && <Alert severity="error">{error}</Alert>
            }
            {
                !isLoading && !error &&
                <div className='d-flex justify-content-end align-items-center'>
                    <Typography
                        variant="h6">
                        #{postId} Discussion Thread
                    </Typography>
                    <IconButton
                        aria-label="refresh"
                        color="success"
                        onClick={() => setRefresh(true)}>
                        <RefreshIcon />
                    </IconButton>
                </div>
            }
            {
                !isLoading && !error &&
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}>
                    <Card className='message-card'>
                        <CardContent className='message-card-content'>
                            <div className='message-scroll'>
                                {
                                    messageList && messageList.map((message) => (
                                        <div
                                            key={message.messageId}
                                            className={message.isAuthor ? 'd-flex justify-content-start' : 'd-flex justify-content-end'}>
                                            <Card
                                                sx={{ minWidth: '30%', 'maxWidth': '60%', 'padding': '8px 12px', 'marginBottom': '8px' }}>
                                                <div className='d-flex flex-row align-items-center'>
                                                    <Tooltip title={message?.sender?.name}>
                                                        <Avatar
                                                            onClick={() => handleUserDetailDialogOpen(message.sender)}
                                                            style={{ 'cursor': 'pointer' }}
                                                            className='mr-2'>
                                                            {message?.sender?.name[0].toUpperCase() ?? '?'}
                                                        </Avatar>
                                                    </Tooltip>
                                                    <h6
                                                        fontFamily={'Monospace'}>
                                                        {message.message}
                                                    </h6>
                                                </div>
                                            </Card>
                                        </div>
                                    ))
                                }
                            </div>
                            {
                                <form className='message-send' onSubmit={handelMessageSend}>
                                    <TextField
                                        id="message"
                                        label="Message"
                                        variant="outlined"
                                        color="success"
                                        fullWidth
                                        size='small' />
                                    <div className='d-flex justify-content-end ml-3'>
                                        <IconButton
                                            aria-label="send"
                                            type='submit'
                                            style={{ 'backgroundColor': 'lightgreen', 'padding': '0.6rem' }}>
                                            <SendIcon style={{ 'color': 'green', 'height': '1.5rem', 'width': '1.5rem' }} />
                                        </IconButton>
                                    </div>
                                </form>
                            }
                        </CardContent>
                    </Card>
                </motion.div>
            }
            <UserDetailsDialog
                open={userDetailDialogOpen}
                handleToClose={() => setUserDetailDialogOpen(false)}
                user={userDetailUser}
            />
        </div>
    )

}
