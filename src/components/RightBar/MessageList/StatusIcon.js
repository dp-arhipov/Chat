import React from 'react';
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import Icon from "@mui/material/Icon";

const StatusIcon = ({status, highlightСolor='primary', ...props}) => {

    return (
        <Icon {...props} >
            {(status=="FETCHING")&&<AccessTimeRoundedIcon sx={{ display:"flex", height: 'inherit'}}/>}
            {(status=="LOADED")&&<DoneRoundedIcon sx={{ display:"flex", height: 'inherit'}}/>}
            {(status=="READED")&&<DoneAllRoundedIcon sx={{ display:"flex", height: 'inherit'}} color={highlightСolor}/>}
        </Icon>
    );
};

export default StatusIcon;