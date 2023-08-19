import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [counter, setCounter] = useState(0); // set default state to 0 when opening for the first time

  const decrement = async () => {
    setCounter(counter - 1);
    AsyncStorage.setItem("number", (counter - 1).toString()); // normally dont need to convert to string as it as already a string but since it is a double, we need to convert it.
  }

  const increment = async () => {
    setCounter(counter + 1);
    AsyncStorage.setItem("number", (counter + 1).toString());
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("number").then(res => JSON.parse(res)); // since the value is stringfied we need to parse it to make it like the original value
      return jsonValue != null ? setCounter(jsonValue ?? 0) : null; // same with jsonValue ? jsonValue : 0
    } catch (e) {
      alert(e.message); // use try and catch to catch any error while using async storage
    }
  }

  useEffect(() => {
    getData()
  }, []); // useEffect will always be the first function to initiate while we go to a page.


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.counter}>{counter}</Text>
      
      <View style={{ flexDirection: 'row' }}>

        <TouchableOpacity>
          <Text onPress={decrement} style={styles.button}>Decrement -</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text onPress={increment} style={styles.button}>Increment +</Text>
        </TouchableOpacity>

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

  button: {
    color: '#fff',
    backgroundColor: 'blue',
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 20
  },

  counter: {
    fontSize: 70,
    marginBottom: 20,
    textAlign: 'center'
  }

});
