import axios from "axios";
import { publicRequest } from "../requestMethods";
import { loginFailure,loginStart,loginSuccess } from "./userRedux";

export const login = async (dispatch,user) => {
    dispatch(loginStart());
    try {
        console.log("Hii1")
        const res = await publicRequest.post("/auth/login", user);
        // console.log(res.data)
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
}
