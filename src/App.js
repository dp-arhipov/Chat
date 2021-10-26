import './App.scss';
import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Chat from "./components/Chat";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
//import 'bootstrap/dist/css/bootstrap.min.css';
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {AuthContext} from './context';
//import {firebaseConfig} from 'src/firebaseConfig'
// import  'firebase/storage'
// import  'firebase/auth'
import { getAuth, signInWithCustomToken } from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";



// Initialize Firebase


const app = initializeApp({
    apiKey: "AIzaSyD2BU7gYSyAqQVjqVWpfPS0Tm2G9eEBQ5Y",
    authDomain: "chat-2b90b.firebaseapp.com",
    projectId: "chat-2b90b",
    storageBucket: "chat-2b90b.appspot.com",
    messagingSenderId: "910644473265",
    appId: "1:910644473265:web:d580b75d98257c3e17e190"
});
const firestore = getFirestore(app);
const auth = getAuth();

function App() {
    const user = useAuthState(auth);

    return (
        <AuthContext.Provider value={{auth, firestore}}>
            <div className="App">

                <BrowserRouter>
                    <Switch>
                        {/*<Route exact path="/" component={Login}></Route>*/}
                        {/*<Route exact path="/dialog">*/}
                        {/*    <Chat/>*/}
                        {/*</Route>*/}
                        {(user[0])
                            ?<Route exact path="/" component={Chat}></Route>
                            :<Route exact path="/" component={Login}></Route>
                        }
                        <Route component={NotFound}></Route>
                    </Switch>
                </BrowserRouter>

            </div>
        </AuthContext.Provider>

    );
}

export default App;
