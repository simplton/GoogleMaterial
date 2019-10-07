/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  Modal,
} from 'react-native'

export default class c2f extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: 'Denver',
      tempC: false,
      tempF: false,
      minC: 0,
      maxC: 0,
      minF: 0,
      maxF: 0,
      icon: '01d',
      desc: '',
      getUp: 0,
      goDown: 0,
      strSun: '',
    };
  }

  componentDidMount() {
    this.getWeather(this.state.city);
  }

  getWeather(inputCity) {
    const addressC = `http://api.openweathermap.org/data/2.5/weather?q=
      ${inputCity}
      &units=metric&APPID=3a29e70d2eba8a433413e5d46c864b54`;
    const addressF = `http://api.openweathermap.org/data/2.5/weather?q=
      ${inputCity}
      &units=imperial&APPID=3a29e70d2eba8a433413e5d46c864b54`;
    fetch(`${addressC}`)
    .then(response => response.json())
    .then((responseJson) => {
      // alert(responseJson.main.temp)
      this.setState({ city: responseJson.name,
        tempC: responseJson.main.temp,
        minC: responseJson.main.temp_min,
        maxC: responseJson.main.temp_max,
        icon: responseJson.weather[0].icon,
        desc: responseJson.weather[0].description,
        getUp: responseJson.sys.sunrise,
        goDown: responseJson.sys.sunset});
    })
    .catch(error => error);
    fetch(`${addressF}`)
    .then(responseF => responseF.json())
    .then((responseJsonF) => {
      this.setState({
        tempF: responseJsonF.main.temp,
        minF: responseJsonF.main.temp_min,
        maxF: responseJsonF.main.temp_max });
      this.getTime(this.state.getUp, this.state.goDown)
    })
    .catch(error => error);
  }
  
  strToHHMMSS(foo){
    var date = new Date(foo * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    
  }
  
  getTime(rize, fall){
    this.setState({ strSun: ' ' + this.strToHHMMSS(rize) + ' - ' + this.strToHHMMSS(fall)});
  }

  render() {
    if (this.state.tempC) {
      return (
        <View style={Style.rootContainer}>
          
         
          
          <View style={Style.box2}>
            <Text style={{fontSize: 30, color: '#6F07B0'}}>
              {this.state.desc}
            </Text>
              <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: 'http://openweathermap.org/img/w/' + this.state.icon + '.png' }}
            />
          </View>
          <View style={Style.box}>
            <Text style={{fontSize: 30, color: '#6F07B0'}}>{Math.round(this.state.tempC)}C/
            {Math.round(this.state.tempF)}F
            </Text>
            <Text style={{ fontSize: 20, color: '#6F07B0' }}>
              {this.state.city}
            </Text>
          </View>
          <View style={Style.box} />
          <View style={Style.box3}>
            <TextInput
              style={{ height: 40, color: '#6F07B0' }}
              placeholder="Type city here!"
              placeholderTextColor= '#6F07B0'
              onChangeText={(text) => {this.setState({text})}}
              onSubmitEditing={(text) => {
                if(this.state.text === ''){
                  this.getWeather('Denver');
                } else {
                  this.getWeather(this.state.text);
                }
              }}
            />
          </View>
        </View>
      );
    }
    return (
      <View style={Style.rootContainer}>
        <View style={Style.box} />
        <View style={Style.box}>
          <Text style={{ height: 40, color: '#6F07B0' }}>Fetching weather data</Text>
        </View>
        <View style={Style.box} />
      </View>
    );
  }
}

const Style = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#B9EBE8',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },

  box: {
    padding: 25,
//     backgroundColor: 'steelblue',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  box3: {
    justifyContent: 'center',
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});


AppRegistry.registerComponent('c2f', () => c2f);
