import React, { useState, useEffect } from 'react';
import {  Text, FlatList, SafeAreaView } from 'react-native';
import { collection, getDocs } from '@firebase/firestore';
import { database } from '../../firebaseConfig';
import TopicCard from '../components/TopicCard';
import BottomTab from '../components/BottomTab';

const HomeScreen = ({navigation}) => {
  const [questions, setQuestions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchQuestions = async () => {
    try {
      const querySnapshot = await getDocs(collection(database, 'topics'));
      const loadedQuestions = [];
      querySnapshot.forEach((doc) => {
        loadedQuestions.push({ id: doc.id, ...doc.data() });
      });
      setQuestions(loadedQuestions);
      setRefreshing(false)
    } catch (e) {
      console.error('Error fetching questions: ', e);
    }
  };
  useEffect(() => {
    fetchQuestions();
  }); 

  return (
    <SafeAreaView>
      <FlatList
      ListEmptyComponent={<Text style={{flex:1, alignSelf:'center', marginTop:250}}>No topics found</Text>}
      refreshing={refreshing}
      onRefresh={fetchQuestions}
      style={{height:'95%'}}
      ListHeaderComponent={<Text style={{fontSize:24, fontWeight:'600'}}>Recent Topics</Text>}
      ListHeaderComponentStyle={{paddingLeft:16, marginBottom:10}}
        data={questions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TopicCard topic={item} navigation={navigation} />}
      />
      <BottomTab navigation={navigation}/>
    </SafeAreaView>
  );
};

export default HomeScreen;