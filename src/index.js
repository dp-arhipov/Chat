import React from 'react';
import ReactDOM from 'react-dom';
import {store} from './store'
import {Provider} from "react-redux";

import App from "./App";
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import './index.scss';



const theme = createTheme();


ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <App/>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
