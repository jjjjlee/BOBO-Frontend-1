import React, {useMemo, useReducer, useContext} from 'react';
import {AsyncStorage} from "react-native";
import axios from "axios";


import reducer, {initialState, LOGGED_IN, LOGGED_OUT} from "../reducer";

// Token 
export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';
export const keys = [TOKEN_KEY, USER_KEY];

//導入情境
const AuthContext = React.createContext();

//身分驗證程序
function AuthProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState || {});

    //取得用戶資訊
    const getAuthState = async () => {
        try {
            
            let token = await AsyncStorage.getItem(TOKEN_KEY);
            let user = await AsyncStorage.getItem(USER_KEY);
            user = JSON.parse(user);

            if (token !== null && user!== null) await handleLogin({token, user});
            else await handleLogout();

            return {token, user};
        } catch (error) {
            throw new Error(error)
        }
    };

    //處理登入，並記住token
    const handleLogin = async (data) => {
        try{
            let {token, user} = data;
            let data_ = [[USER_KEY, JSON.stringify(user)], [TOKEN_KEY, token]];
            await AsyncStorage.multiSet(data_);
            //data是一個陣列，multiSet可以將多個鍵值同時存儲到長時間的儲存(保存到本地)

            axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
            //用於向服務器證明發送請求的用戶已經被驗證

            dispatch({type: LOGGED_IN, user:data.user});
        }catch (error) {
            throw new Error(error);
        }
    };

    const handleLogout = async () => {
        try{

            await AsyncStorage.multiRemove(keys);

            delete axios.defaults.headers.common["Authorization"];
            //不再記住此人
            
            dispatch({type: LOGGED_OUT});
        }catch (error) {
            throw new Error(error);
        }
    };

    const updateUser = async (user) => {
        try {
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
            //將用戶資訊保存至本地
            dispatch({type: LOGGED_IN, user}); 
        } catch (error) {
            throw new Error(error);
        }
    };

    //將上述包裝成value，提供給 AuthContext.Provider
    const value = useMemo(() => {
        return {state, getAuthState, handleLogin, handleLogout, updateUser};
    }, [state]);

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);
export { AuthContext, useAuth }
export default AuthProvider;