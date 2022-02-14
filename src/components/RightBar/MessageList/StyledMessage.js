import React, {memo} from 'react';
import Message from "./Message";
import styled from "styled-components";


const StyledMessage = styled(Message)`
     background-color: ${props => props.isCurrentUserMessage ? "inherit" : "rgba(25,118,210,0.11)"};
     margin-left: ${props => props.isCurrentUserMessage ? 'auto' : 0};
     margin-bottom: 10px;
     width: max-content;
     max-width: 60% ;
`;

export default memo(StyledMessage);