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

//membuat function utk proses login
loginFunction = () =>{
  const{uEmail} = this.state;
  const{uPass} = this.state;

  fetch('http://17.17.17.104/my-react/user_login.php',{
    method:'POST',
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json',
    },
    body:JSON.stringify({
      email:uEmail, password:uPass
    })
  }).then((response)=>response.json())
  .then((response) =>{
    //jika email dan password benar
    if(response==='Data Matched'){
      this.props.navigation.navigate('Second', {Email:uEmail})
    }
    //jika email atau pass tdk cocok
    else{
      Alert.alert(response);
    }
  }).catch(error=>{
    console.error(error);
    });
};

render(){
  return(
<View>
<Text style={{fontSize:20, color:'#000000', textAlign:'center', marginBottom: 16,}}>
FORM LOGIN
</Text>

<TextInput placeholder='Tuliskan Email' onChangeText={uEmail=>this.setState({uEmail})}/>
<TextInput placeholder='Tuliskan Password' onChangeText={uPass=>this.setState({uPass})} secureTextEntry={true}/>

<Button title='Login' onPress={this.loginFunction}/>
<Button title='Registrasi' onPress={this.loginFunction}/>
</View>
  );
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

const RootStack = createStackNavigator({
  Home:LoginActivity,
  Second:profileActivity,
},
{
  initialRouteName:'Home',
},
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;