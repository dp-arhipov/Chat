import React from 'react';
import {useSelector} from "react-redux";
import * as selectors from "../../store/selectors"

import DialogList from "./DialogList";
import FinderInput from "./FinderInput";
import FinderResultList from "./FinderResultList";
import Box from "@mui/material/Box";

const LeftBar = () => {

    const finderStatus = useSelector(selectors.finderStatus);

    return (
        <Box display={'flex'} flex={'1'} flexDirection={'column'} sx={{minWidth: '0', borderRight: '1px solid lightgray'}} pt={1}>
            <Box p={3}>
                <FinderInput/>
            </Box>

            {(finderStatus != 'INIT')
                ? <FinderResultList/>
                : <DialogList flex='1 0 0'/>
            }

        </Box>
    );
};

export default LeftBar;