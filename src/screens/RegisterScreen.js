import React, {  useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import   { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { createUserWithEmailAndPassword, getAuth,updateProfile } from 'firebase/auth';
import {  database, firebaseConfig } from '../../firebaseConfig';
import { showMessage } from "react-native-flash-message";
import {  collection, addDoc } from '@firebase/firestore';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const firebaseApp = initializeApp(firebaseConfig);
  const firebaseAuth = getAuth(firebaseApp);

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth,email, password);
      await updateProfile(userCredential.user, {
        displayName: fullName,
        approved:false
      }); 
  const userCollectionRef = collection(database, 'users');
      const userDocData = {
        uid: userCredential.user.uid,
        fullName: fullName,
        email: email,
        approved: false,
      };
    await addDoc(userCollectionRef, userDocData);
      showMessage({
            message: "Approval request send to admin",
            type: "success",
          });
      navigation.navigate('SignIn')
      
      // You can navigate to the sign-in screen or perform other actions after successful registration
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
    <Image source={require('../assets/logo.png')} style={{flex:1, alignItems:'center', justifyContent:'center', alignSelf:'center', width:'75%', marginTop:70}} resizeMode='contain'/>
    <TextInput
        style={styles.input}
        placeholder="Full Name"
        autoCapitalize="words"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
      />
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
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={{fontSize:18, fontWeight:'500', color:'white'}}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation?.navigate('SignIn')} style={{alignItems:'center', flex:1, justifyContent:'flex-end', marginBottom:10 }}>
        <Text style={{fontSize:14}}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
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

export default RegisterScreen;
