import {DB} from "../../API";
import {
    setFinderStatus,
    setFinderResults,

} from "../slices";


export const find = (searchString) => {
    return async function disp(dispatch, getState) {
        let result = [];

        dispatch(setFinderStatus("FETCHING"))
        const user = await DB.findUserByNickName(searchString)
        if (user) result.push(user)
        dispatch(setFinderResults(result))
        dispatch(setFinderStatus("LOADED"))

    }
}


export const changeCurrentUserNickName = (nickName) => {
    return async function disp(dispatch, getState) {
        await DB.setNickName(nickName);
        //dispatch(setNickName(nickName))
    };
}

export const changeCurrentUserName = (name) => {
    return async function disp(dispatch, getState) {
        await DB.setName(name);
        //dispatch(setName(name))
    };
}

export const isNickNameBusy = async (nickName) => {
    return await DB.findUserByNickName(nickName) ? true : false;
}





