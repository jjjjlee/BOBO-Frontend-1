import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet ,TouchableOpacity, ScrollView,} from 'react-native';
import { Formik } from 'formik';
import {
    Colors,
    UserSettingContainer,
    UserTextInput,
    UserFormArea,
    UpperLefttext,
} from './../components/styles'
import Dropdown from '../components/dropdown';

const {brand, darklight,holderwords, primary, orange} = Colors;

const Candidate =()=>{
    return (
        <UserSettingContainer>
          <View style={{}}>
            
          </View>
          <Dropdown />
        </UserSettingContainer>
      );
}

export default Candidate;