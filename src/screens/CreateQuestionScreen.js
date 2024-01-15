import React from 'react';
import {  Text, SafeAreaView,  } from 'react-native';
import { addDoc, collection } from '@firebase/firestore';
import QuestionForm from '../components/ComponentForm';
import { database } from '../../firebaseConfig';

const CreateQuestionScreen = ({ navigation }) => {

  const handleSubmit = async(topicData) => {
      const docRef = await addDoc(collection(database, 'topics'), topicData);
      console.log(docRef)
  };
  return (
    <SafeAreaView>
      <Text onPress={()=>navigation.navigate('Home')} style={{marginLeft:16, marginBottom:20}}>Go back</Text>
      <Text style={{fontSize:24,fontWeight:'600', marginLeft:16}}>Post New Topic</Text>
      <QuestionForm onSubmit={handleSubmit} navigation={navigation} />
    </SafeAreaView>
  );
};

export default CreateQuestionScreen;

