import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Chat from "./components/Chat";
import Login from "./components/Login";
import Test from "./components/Test";
import NotFound from "./components/NotFound";
import './App.scss';
import UserProfile from "./components/UserProfile";
import {useSelector} from "react-redux";

function App() {


    const currentUser = useSelector(state => state.currentUser);

    return (

        <div className="App">

            <BrowserRouter>
                <Switch>
                    {(currentUser)
                        ? <Route exact path="/" component={Chat}></Route>
                        : <Route exact path="/" component={Login}></Route>
                    }

                    <Route exact path="/test" component={Test}></Route>
                    <Route exact path="/profile" component={UserProfile}></Route>
                    <Route component={NotFound}></Route>
                </Switch>
            </BrowserRouter>


        </div>


    );
}

export default App;
