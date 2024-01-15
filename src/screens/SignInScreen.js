import React, { useState } from 'react';
import {  TextInput,  StyleSheet, SafeAreaView, Image, TouchableOpacity, Text } from 'react-native';
import 'firebase/auth';
import { database, firebaseConfig } from '../../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { showMessage } from "react-native-flash-message";
import {  collection, getDocs,query,where } from '@firebase/firestore';

const SignInScreen = ({navigation}) => {
    
    const firebaseApp = initializeApp(firebaseConfig);
  const firebaseAuth = getAuth(firebaseApp);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth,email, password)
      const user = userCredential.user;
      const userCollectionRef = collection(database, 'users');
      const q = query(userCollectionRef, where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size > 0) {
        const userData = querySnapshot.docs[0].data();
        const isApproved = userData.approved;

        if (isApproved) {
          showMessage({
            message: "Sign-in successful",
            type: "success",
          });
          navigation.navigate('Home');
        } else {
          showMessage({
            message: "Your account is not approved by admin.",
            type: "danger",
          });

        }
      } else {
        showMessage({
          message: "User not found in the database.",
          type: "danger",
        });
      }
      // if(userCredential?.user?.emailVerified){
      //   showMessage({
      //       message: "Sign in successfull",
      //       type: "success",
      //     });
      //     navigation.navigate('Home')
      // }else{
      //   showMessage({
      //       message: "Your account is not approved by admin.",
      //       type: "danger",
      //     });
      //     navigation.navigate('Home')
      // }
    } catch (error) {
        console.log(error)
        console.error('Sign-in error:', error.message);
            showMessage({
                message: "Invalid credentials",
                type: "danger",
            });
        }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/logo.png')} style={{flex:1, alignItems:'center', justifyContent:'center', alignSelf:'center', width:'75%', marginTop:70}} resizeMode='contain'/>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={handleSignIn} style={styles.button}>
        <Text style={{fontSize:18, fontWeight:'500', color:'white'}}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation?.navigate('Register')} style={{alignItems:'center', flex:1, justifyContent:'flex-end', marginBottom:10 }}>
        <Text style={{fontSize:14}}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 16,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius:8,
    fontSize:18
  },
      button: {
    backgroundColor: 'black',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    flexDirection: 'row',
    marginTop:10
  }
});

export default SignInScreen;
