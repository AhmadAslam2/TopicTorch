// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './src/screens/SignInScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import HomeScreen from './src/screens/HomeScreen';
import FlashMessage from "react-native-flash-message";
import CreateQuestionScreen from './src/screens/CreateQuestionScreen';
import TopicDetailScreen from './src/screens/TopicDetailScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown:false}}>
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="Topic" component={CreateQuestionScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="TopicDetail" component={TopicDetailScreen} options={{ title: 'Register' }} />
      </Stack.Navigator>
      <FlashMessage position="bottom"  floating={true}/>
    </NavigationContainer>
  );
};

export default App;
