import {DB} from "../../services/firebase";
import {
    setFinderStatus,
    setFinderResults,

} from "../slices";
import * as selectors from "../selectors";


export const find = (searchString) => {
    return async function disp(dispatch, getState) {
        const currentUserId = selectors.currentUserId(getState())
        let result = [];
        dispatch(setFinderStatus("FETCHING"))
        const user = await DB.findUserByNickName(searchString)
        if(user && user.id!=currentUserId) result.push(user)

        dispatch(setFinderResults(result))
        dispatch(setFinderStatus("LOADED"))

    }
}


export const changeCurrentUserNickName = (nickName) => {
    return async function disp(dispatch, getState) {
        await DB.setNickName(nickName);
    };
}

export const changeCurrentUserName = (name) => {
    return async function disp(dispatch, getState) {
        await DB.setName(name);
    };
}

export const isNickNameBusy = async (nickName) => {
    return await DB.findUserByNickName(nickName) ? true : false;
}





