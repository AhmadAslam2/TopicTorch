import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { getAuth, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { showMessage } from "react-native-flash-message";

const ProfileScreen = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

    useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setFullName(currentUser.displayName || '');
      setEmail(currentUser.email || '');
    }
  }, []);


  const handleUpdateProfile = async () => {
    try {
      const user = auth.currentUser;
      if (fullName) {
        await updateProfile(user, { displayName: fullName });
      }
      if (email) {
        await updateEmail(user, email);
      }
      if (password) {
        await updatePassword(user, password);
      }
      showMessage({
        message: "Profile updated successfully",
        type: "success",
      });
    } catch (error) {
      console.error('Profile update error:', error.message);
      showMessage({
        message: "Error updating profile",
        type: "danger",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text onPress={()=>navigation.navigate('Home')} style={{position:'absolute', top:50, left:10, }}>Go back</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        autoCapitalize="words"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
      />
      <TextInput
        editable={false}
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
      <TouchableOpacity onPress={handleUpdateProfile} style={styles.button}>
        <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('SignIn')} style={[styles.button,{backgroundColor:'#9A031E'}]}>
        <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>Logout</Text>
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
    borderRadius: 8,
    fontSize: 18
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
  }})

  export default ProfileScreen