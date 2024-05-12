import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MainScreen = ({route}) => {
    const {uuid} = route.params;
    const navigation = useNavigation();

    const handleButtonPress = (routeName) => {
    navigation.navigate(routeName,{inst_uuid:uuid});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('PostTab')}>
        {/* Add icon here */}
        <Text style={styles.buttonText}>刊登</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('TrackPreview')}>
        {/* Add icon here */}
        <Text style={styles.buttonText}>追蹤</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Candidates')}>
        {/* Add icon here */}
        <Text style={styles.buttonText}>送養</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MainScreen;
