import React, { useState } from 'react';
import {View} from 'react-native';

import * as api from "../APP/service_auth";
import { useAuth } from "../APP/provider_auth";

import Form from 'react-native-basic-form';


export default function Login(props) {
    const {navigation} = props;
    const {navigate} = navigation;

    //1 - DECLARE VARIABLES
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { handleLogin } = useAuth();

    const fields = [
        {name: 'email', label: 'Email Address', required: true},
        {name: 'password', label: 'Password', required: true, secure: true}
    ];

    async function onSubmit(state) {
        setLoading(true);

        try {
            let response = await api.login(state);
            await handleLogin(response);

            setLoading(false);

            //check if username is null
            let username = (response.user.username !== null);
            if (username) navigate('App');
            else navigation.replace('Username');
        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }
    
};

Login.navigationOptions = ({}) => {
    return {
        title: ``
    }
};