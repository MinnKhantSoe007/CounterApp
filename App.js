import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  [counter, setCounter] = useState(0);

  const decrement = async() => {
    setCounter(counter - 1);
    AsyncStorage.setItem("number", (counter-1).toString());
  }

  const increment = async() => {
    setCounter(counter + 1);
     AsyncStorage.setItem("number", (counter+1).toString());
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("number").then(res => JSON.parse(res));
      return jsonValue != null ? setCounter(jsonValue ?? 0) : null;
      
    } catch(e) {
      // error reading value
    }
  }

  useEffect(() => {
    getData()
  }, []);


  return (
     <View style={styles.container}>
        <Text style={{fontSize: 60, marginBottom: 20, borderWidth: 1, textAlign: 'center'}}>{counter} </Text>
        <StatusBar style="auto" />
        <View style={{ flexDirection: 'row' }}>
          <Button onPress={decrement} title='Decrease'></Button>
          <Text>          </Text>
          <Button onPress={increment} title='Increase'></Button>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
