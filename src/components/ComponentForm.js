import React, { useState } from 'react';
import { View, TextInput,  TouchableOpacity, StyleSheet, Text } from 'react-native';

const QuestionForm = ({ onSubmit, navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onSubmit({ title, description });
    setTitle('');
    setDescription('');
    navigation?.navigate('Home')
  };

  return (
    <View style={{padding:16}}>
      <TextInput
      style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
      style={[styles.input,{height:150}]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={{fontSize:18, fontWeight:'500', color:'white'}}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuestionForm;

const styles = StyleSheet.create({
      button: {
    backgroundColor: 'black',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    flexDirection: 'row',
    marginTop:10
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
})