import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import {useInView} from 'react-intersection-observer';
import {useDispatch, useSelector} from "react-redux";
import * as selectors from "../../../store/selectors";
import {setDialogMessageProps} from "../../../store/slices";
import {setDialogMessageIsReaded} from "../../../store/actions";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import StatusIcon from "./StatusIcon";
import Button from "@mui/material/Button";




const Message = ({text, time, status, messageId, onRead, isCurrentUserMessage,...props}) => {

    //
    // const {ref, inView, entry} = useInView({
    //     triggerOnce: true,
    //     threshold: 0.5,
    // });


    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
        // Track the actual visibility of the target
        //trackVisibility: true,
        // Set a minimum delay between notifications, it must be set to 100 (ms) or greater
        // For performance perspective, use the largest tolerable value as much as possible
        delay: 300,
    });

    useEffect(() => {
        if (inView && !isCurrentUserMessage && status != 'READED') onRead(messageId)
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


// const Message = ({...props}) => {
//
//     return (
//         <Card {...props} elevation={1}>
//             Text
//         </Card>
//     )
// }

export default React.memo(Message);