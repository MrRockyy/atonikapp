import { View, Text, StyleSheet ,Image, Pressable, Touchable, TouchableOpacity} from 'react-native';
import logo from "../assets/images/logo.png";
import po1 from "../assets/images/po2.png"
import { Link,router,useNavigation,useLocalSearchParams } from "expo-router";
import React, { useState, useLayoutEffect, useEffect } from "react";
import left from "../assets/images/left.png"
import right from "../assets/images/right.png"
import { useRoute } from '@react-navigation/native';

export default function Tab() {
  const navigation = useNavigation();
  const route = useRoute();
  const { event } = route.params;
  
    useLayoutEffect(() => {

        navigation.setOptions({
          headerShown: false,
      
        });
      }, [navigation]);
  return (
    <View style={styles.container}>
    <Image style={styles.logo} source={logo }/>
    <View style={{flexDirection:"row", display:"flex"}}>
    <Image style={styles.row} source={left }/>
    <Image style={{height: 240, marginTop:30,width:240, borderRadius:20}} source={{uri: event.image }}/>
    <Image style={styles.row} source={right }/>
    </View>
    <View style={{borderRadius: 0,

alignContent:"center",
paddingHorizontal: 10,
overflow: 'hidden',

borderWidth: 0, // Grosor del borde
borderColor:"131313",
width:"100%",
height:320,

shadowOffset: {
  width: 0,
  height: 0,
},
shadowOpacity: 0.7,
shadowRadius: 10,
marginTop:20,
elevation:120,}}> 
    <Text style={{alignSelf:"center",fontSize:15,color:"white", textAlign:"center",width:"90%",marginTop:20, fontWeight:100}} >{event.description}</Text>
   
    <View style={{   marginLeft:11,marginTop:20 ,display:'flex', flexDirection:"row" ,flexWrap:"wrap", gap:40, width:"70%",alignContent:"center" ,justifyContent:"center"}}>
    <View style={styles.cardText}>
            <Text style={styles.Border1}>Lugar:</Text>
            <Text style={styles.cardText}>{event.place}</Text>
        </View>

        <View style={styles.cardText}>
            <Text style={styles.Border1}>Fecha:</Text>
            <Text style={styles.cardText}>3 de septiembre</Text>
        </View>
 

        <View style={styles.cardText, {marginRight:0}}>
            <Text style={styles.Border}>Precio:</Text>
            <Text style={styles.cardText}>$ {event.price}</Text>
        </View>
        <View style={styles.cardText}>
            <Text style={styles.Border}>Hora:</Text>
            <Text style={styles.cardText}>10 PM</Text>
        </View>
    

      
        
    </View>
    </View>
    <TouchableOpacity style={{backgroundColor:"white", marginTop:"auto", width:"100%", height:60}}>
<Text style={{fontSize:18,fontWeight:300,textAlign:"center", marginBottom:"auto", marginTop:"auto"}}>Adquirir entrada</Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#131313",
alignItems:"center"
 
  },
  logo: {
    height: 50,
    width: 50,
    marginTop: "12%",
  },
  cardText:{
   
    flexDirection:"column",
    color:"white",
    marginRight:0
    
  },
  Border:{
    borderTopWidth: 1,
        borderTopColor: '#ffd000',
        borderLeftWidth: 1,
        borderLeftColor: '#ffd000',
        borderBottomWidth: 1,
        borderRightColor:'#ffd000',
        borderBottomColor: '#ffd000',
        borderRightWidth: 1,
        color:"white",
        paddingLeft:10,
        paddingRight:10,
        marginBottom:0,
        fontSize:19,
        fontWeight:"100"
  },
  Border1:{
    borderTopWidth: 1,
        borderTopColor: '#ffd000',
        borderLeftWidth:1,
        borderLeftColor: '#ffd000',
        borderBottomWidth: 1,
        borderBottomColor: '#ffd000',
        borderRightWidth: 1,
        borderRightColor:'#ffd000',
        color:"white",
        paddingLeft:5,
        marginBottom:0
  },
    row: {
    height: 45,
    width: 30,
    justifyContent:"center",
    marginTop:"auto",
    marginBottom:"auto",
    marginLeft:15,
    marginRight:15
  },
});

