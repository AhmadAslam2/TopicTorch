import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs, addDoc, serverTimestamp } from '@firebase/firestore';
import { database } from '../../firebaseConfig';

const TopicDetailScreen = ({ route, navigation }) => {
  const { topic } = route.params;
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState('');


    useEffect(() => {
    const fetchComments = async () => {
      try {
        const querySnapshot = await getDocs(collection(database, 'topics', topic.id, 'comments'));
        const commentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments: ', error);
      }
    };
    fetchComments();
  });

  const addComment = async () => {
    try {
      const docRef = await addDoc(collection(database, 'topics', topic.id, 'comments'), {
        text: comment,
        timestamp: serverTimestamp(),
      });
      setComment(''); 
      console.log('Comment added with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding comment: ', error);
    }
  };

  return (
    <SafeAreaView>
        <Text onPress={()=>navigation.navigate('Home')} style={{position:'absolute', top:50, left:15, }}>Go back</Text>
        <View style={{padding:16, marginTop:20}}>
      <Text style={{ fontSize: 24, fontWeight: '600' }}>{topic.title}</Text>
      <Text style={{ fontSize: 16, marginTop:10 }}>{topic.description}</Text>
        </View>
        <View style={{paddingHorizontal:16}}>
            <Text style={{ fontSize: 20, fontWeight: '600', marginBottom:14 }}>Comments</Text>
        {comments && comments?.map((comment) => (
                <Text style={{ fontSize: 16, marginBottom:6 }} key={comment.id}>* {comment.text}</Text>
            ))}
        </View>
      <TextInput
      style={styles.input}
        placeholder="Add a comment..."
        value={comment}
        onChangeText={(text) => setComment(text)}
      />
      <View style={{paddingHorizontal:16}}>
    <TouchableOpacity onPress={addComment} style={styles.button}>
        <Text style={{fontSize:18, fontWeight:'500', color:'white'}}>Post Comment</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop:10,
    marginHorizontal:16,
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
    marginTop:10,
  }
});
export default TopicDetailScreen;