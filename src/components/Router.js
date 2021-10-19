import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import DialogWindow from "./DialogWindow";
import NotFound from "./NotFound";
import App from "../App";
import Chat from "./Chat";

const Router =()=>{

    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App}></Route>
                <Route exact path="/dialog/:id" component={Chat}></Route>
                <Route component={NotFound}></Route>
            </Switch>
        </BrowserRouter>

    )
}

export default Router;



