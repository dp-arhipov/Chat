import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NotFound from "./NotFound";
import App from "../App";
import Main from "./Main";

const Router =()=>{

    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App}></Route>
                <Route exact path="/dialog/:id" component={Main}></Route>
                <Route component={NotFound}></Route>
            </Switch>
        </BrowserRouter>

    )
}

export default Router;



