import React from 'react';
import { Text, StyleSheet, Pressable, TouchableOpacity,View } from 'react-native';
import { Colors } from './styles';
import { Icon } from 'react-native-elements';

const {orange, darklight, white} = Colors;


export function LongThinButton(props) {
  const { onPress, title, backgroundColor } = props;
  const customedStyle = {...styles.longthinbutton}
  customedStyle.backgroundColor = backgroundColor
    return(
        <Pressable style={customedStyle} onPress={onPress}>
            <Text style={styles.welcometext}>{title}</Text>
        </Pressable>
    );
}

export const CircleButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: 'white', // You can set the background color as needed
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name={props.logoName} type="ionicon" color={props.color} size={30} />
      </View>
    </TouchableOpacity>
  );
};




const styles = StyleSheet.create({
  longthinbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 120,
    borderRadius: 2,
    elevation: 3,
    borderWidth:1,
    borderColor:'#ffffff' ,
    borderRadius: 30,
    margin:5
  },
  welcometext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});


