import './App.scss';
import React, {useState} from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Chat from "./components/Chat";
import NotFound from "./components/NotFound";


function App() {


    return (
        <div className="App">

                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Chat}></Route>
                        <Route exact path="/dialog">
                            <Chat/>
                        </Route>
                        <Route component={NotFound}></Route>
                    </Switch>
                </BrowserRouter>

        </div>


    );
}

export default App;
