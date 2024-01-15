import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const BottomTab = ({navigation}) => {
  return (
        <View style={{ height:80, flexDirection:'row', paddingBottom:20}}>
        <TouchableOpacity onPress={()=> navigation.navigate('Home')} style={{flex:1, height:'100%', justifyContent:'center',alignItems:'center', borderColor:'grey', borderWidth:1, backgroundColor:'black'}}><Text style={{fontSize:16, fontWeight:'500', color:'white'}}>Home</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('Topic')} style={{flex:1, height:'100%', justifyContent:'center',alignItems:'center', borderColor:'grey', borderWidth:1, backgroundColor:'black'}}><Text style={{fontSize:16, fontWeight:'500', color:'white'}}>New Topic</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('Profile')} style={{flex:1, height:'100%', justifyContent:'center',alignItems:'center', borderColor:'grey', borderWidth:1, backgroundColor:'black'}}><Text style={{fontSize:16, fontWeight:'500', color:'white'}}>Profile</Text></TouchableOpacity>
      </View>
  )
}
export default BottomTab