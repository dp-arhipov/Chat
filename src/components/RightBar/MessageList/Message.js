import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {useInView} from 'react-intersection-observer';
import { setDialogMessageIsReaded} from "../../../store/actions";
import StatusIcon from "./StatusIcon";




const Message = ({text, time, status, messageId, timestamp, onRead, isCurrentUserMessage,...props}) => {

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
        delay: 300,
    });

    useEffect(() => {
        if (inView && !isCurrentUserMessage) {
            onRead(timestamp, messageId)
        }
    }, [inView])


    return (

                <Card {...props} elevation={1} ref={ref} >
                    <CardContent>
                        <Box sx={{ display:"flex"}}>
                            <Typography variant="caption" color="textSecondary">
                                {time}
                            </Typography>
                            {
                                (isCurrentUserMessage) && <StatusIcon sx={{marginLeft: 'auto', height: 16}} status={status}/>
                            }
                        </Box>
                        <Typography component="pre" variant="body1" sx={{overflowWrap: "break-word", whiteSpace:"pre-wrap"}}>

                           {text}
                        </Typography>
                    </CardContent>
                </Card>



    );
};


export default React.memo(Message);