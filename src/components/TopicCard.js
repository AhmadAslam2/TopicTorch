import React from 'react';
import {  Text, StyleSheet, TouchableOpacity } from 'react-native';

const TopicCard = ({ topic, navigation }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('TopicDetail', { topic })}>
      <Text style={styles.title}>{topic.title}</Text>
      <Text>{topic.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10},
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 10,
     borderColor: 'gray',
    borderWidth: 1,
    marginBottom:8,
    marginHorizontal:16,
  },
  title: {
    fontWeight:'600',
    fontSize: 16,
    marginBottom:10
  },
});

export default TopicCard