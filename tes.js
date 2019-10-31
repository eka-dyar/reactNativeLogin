import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, Alert, TextInput, Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

//spy dalam 1 project bisa banyak activities
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

//membuat class utk login
class LoginActivity extends Component{
  //bikin variabel bertipe static
  static navOptions = {
    title: 'LoginActivity',
  }; 

constructor(props){
  super(props);
  this.state = {
    uEmail:'',
    uPass:''
   }
}

//membuat class utk profile
class profileActivity extends Component{
  static navOptions = {
    title:'ProfileActivity',
  };

  render(){
    const {goBack} = this.props.navigation;

    return(
      <View>
        <Text>
        {this.props.navigation.state.params.Email}
        </Text>
        <Button title='Logout' onPress={()=>goBack(null)}/>
      </View>

    )
  }
}
