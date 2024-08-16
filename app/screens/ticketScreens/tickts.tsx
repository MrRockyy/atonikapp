import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

import { View, Text, StyleSheet,TouchableOpacity, FlatList, Image } from 'react-native';
import logo from "../../assets/images/logo.png";
import po1 from "../../assets/images/po1.png"
import po2 from "../../assets/images/po2.png"
import left from "../../assets/images/left.png"
import right from "../../assets/images/right.png"
import { useEffect, useState } from "react";

import { useRouter } from "expo-router";

const data = [po1,po2,po1,po2,po2];

const duplicatedData = [...data, ...data]; // Duplicar los datos

export default function Tab() {
   const navigation = useNavigation(); 
    const router = useRouter();
    const [events, setEvents] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const formatDate = (dateString) => {
      const date = new Date(dateString);
  
      // Array de letras de los días de la semana
      const days = ["D", "L", "M", "M", "J", "V", "S"];
  
      // Obtener la letra del día de la semana
      const dayLetter = days[date.getDay()];
  
      // Obtener el número del día del mes
      const dayNumber = date.getDate();
  
      return [dayLetter, dayNumber];
    };
    const [todayDate, setTodayDate] = useState(
      new Date().toISOString().split("T")[0]
    );
    const addDays = (dateString, days) => {
      const date = new Date(dateString);
      date.setDate(date.getDate() + days);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses van de 0 a 11
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
  const flatListRef = useRef(null);
  const changeTodayDate = (newDate: any) => {
    setTodayDate(newDate);
  };

  const convertTo24HourFormat = (time12h: string): string => {
    // Formato de entrada de 12 horas
    const dateTime12h = DateTime.fromFormat(time12h, "h:mm a");
  
    // Formato de salida de 24 horas
    const time24h = dateTime12h.toFormat("HH:mm");
  
    return time24h;
  };
  const hasEventStarted = (eventDate, eventStartTime) => {
    if (!eventDate || !eventStartTime) return false;
    const eventTime = DateTime.fromISO(`${eventDate}T${convertTo24HourFormat(eventStartTime)}` );
    const currentTime = DateTime.now().setZone('America/Bogota');
   
    console.log(currentTime, eventTime);
    return currentTime > eventTime;
  }
  const isEventStartingInMoreThanTwoHours = (eventDate, eventStartTime) => {
    const eventTime = DateTime.fromISO(`${eventDate}T${convertTo24HourFormat(eventStartTime)}`);
    const currentTime = DateTime.now().setZone('America/Bogota');
    const diffInHours = (eventTime - currentTime) / (1000 * 60 * 60);
    return diffInHours > 2;
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
        
      <Image style={styles.po} source={item}/>

    </TouchableOpacity>
  );

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    if (contentOffset.x >= contentSize.width - layoutMeasurement.width) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: false });
    }
  };
  const fetchEvents = async (date) => {
    try {
      const response = await fetch(
        `http://192.168.20.119:5000/api/events?date=${date}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setEvents(data); // Assuming the response is an array of JSON objects
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo}/>
      <View style={styles.listContainer}>
        <Text style={styles.p1}>Recomendados</Text>
        <FlatList
          ref={flatListRef}
          data={duplicatedData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      </View>

        <View style={styles.allText}>
        <TouchableOpacity
          onPress={() => {
            const newDate = addDays(todayDate, 0);
            changeTodayDate(newDate);
            fetchEvents(newDate);
          }}
          style={styles.rowContainer}
        >
          <Image source={left} style={styles.row} />
        </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const newDate = addDays(todayDate, -1);
              changeTodayDate(newDate);
              fetchEvents(newDate);
            }}
            style={styles.textContainer}
          >
            <Text style={styles.letter}>
              {formatDate(addDays(todayDate, 0))[0]}
            </Text>
            <Text style={styles.num}>
              {formatDate(addDays(todayDate, 0))[1]}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const newDate = addDays(todayDate, 0);
              changeTodayDate(newDate);
              fetchEvents(newDate);
            }}
            style={[styles.textContainer, { marginBottom: 4 }]}
          >
            <Text style={styles.letter}>
              {formatDate(addDays(todayDate, 1))[0]}
            </Text>
            <Text style={styles.num}>
              {formatDate(addDays(todayDate, 1))[1]}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.textContainer, styles.middle]}>
            <Text style={[styles.letter, styles.middleText]}>
              {formatDate(addDays(todayDate, 2))[0]}
            </Text>
            <Text style={[styles.num, styles.middleText]}>
              {formatDate(addDays(todayDate, 2))[1]}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const newDate = addDays(todayDate, 2);
              changeTodayDate(newDate);
              fetchEvents(newDate);
            }}
            style={[styles.textContainer, { marginBottom: 4 }]}
          >
            <Text style={styles.letter}>
              {formatDate(addDays(todayDate, 3))[0]}
            </Text>
            <Text style={styles.num}>
              {formatDate(addDays(todayDate, 3))[1]}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const newDate = addDays(todayDate, 3);
              changeTodayDate(newDate);
              fetchEvents(newDate);
            }}
            style={[styles.textContainer]}
          >
            <Text style={styles.letter}>
              {formatDate(addDays(todayDate, 4))[0]}
            </Text>
            <Text style={styles.num}>
              {formatDate(addDays(todayDate, 4))[1]}
            </Text>
          </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            const newDate = addDays(todayDate, 2);
            changeTodayDate(newDate);
            fetchEvents(newDate);
          }}
          style={styles.rowContainer}
        >
          <Image source={right} style={styles.row} />
        </TouchableOpacity>
        </View>
        
        <TouchableOpacity
        onPress={()=> {navigation.navigate("event")}}
  style={styles.blurContainer}
>
  <View style={styles.blur}>
    <Image style={styles.poa} source={po2}/>  
    <View style={{marginLeft:5}}>
      <Text style={{ fontSize: 13, borderTopWidth: 1,
        borderTopColor: '#ffd000',
        borderLeftWidth: 1,
        borderLeftColor: '#ffd000',
        borderBottomWidth: 1,
        borderBottomColor: '#ffd000',
        borderRightWidth: 0,
        width: 60,
        padding: 3,
        color: "white",
        fontWeight: 100,
        marginTop: 13,
        marginLeft: 10
      }}>Fecha:</Text>
      
      <Text style={{ fontSize: 13, color: "white", fontWeight: 100, marginTop: 2, marginLeft: 10 }}>30 de septiembre</Text>
      
      <Text style={{ fontSize: 13, borderTopWidth: 1,
        borderTopColor: '#ffd000',
        borderLeftWidth: 1,
        borderLeftColor: '#ffd000',
        borderBottomWidth: 1,
        borderBottomColor: '#ffd000',
        borderRightWidth: 0,
        width: 60,
        padding: 3,
        color: "white",
        fontWeight: 100,
        marginTop: 13,
        marginLeft: 10
      }}>Lugar:</Text>
      
      <Text style={{ fontSize: 13, color: "white", fontWeight: 100, marginTop: 2, marginLeft: 10 }}>Tunja, boyaca</Text>
    </View>
  </View>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    flex: 1,
    
    alignItems: 'center',
  },
  logo: {
    height: 50,
    width: 50,
    marginTop: "12%",
  },
  listContainer: {
    marginTop:25,
    height: 197, // Ajusta la altura según tus necesidades
  },
  item: {
    backgroundColor: "#5A188D",
    height:129,
    width:129,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#ffffff",
    shadowOffset: { width: 20, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 6.27,
    elevation: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  po:{
  height:132,
  width: 129,
  },
  p1:{
    color:"white",
    fontSize:20,
    fontWeight:"100",
    marginLeft:10,
    marginBottom:10,
  },
  navContainer: {
    display: "flex",
    flexDirection: "row",
    width: "10%",
    alignContent: "center",
    justifyContent: "center",
    marginTop: "11%",
  },
  rowContainer: {
    alignContent: "center",
    justifyContent: "center",
  },
  row: {
    height: 45,
    width: 30,
  },
  textContainer: {
    alignContent: "center",
    justifyContent: "center",
    width: 52,
  },
  letter: {
    fontSize: 25,
    fontWeight:"100",
    color: "white",
    textAlign: "center",
  },
  num: {
    fontSize: 27,
    color:"white",
    fontWeight:"100",
    textAlign: "center",
  },
  allText: {
    gap: 5,
    display: "flex",
    flexDirection: "row",
    marginLeft: "3%",
    marginRight: "3%",
    
  },
  middleText: {
    backgroundColor: "#5A188D",
    color: "white",
    marginBottom: 0,
  },
  middle: {
    backgroundColor: "#5A188D",
    color: "white",
    marginBottom: 15,
  },
  img1: {
    width: 160,
    height: 12,
    marginTop: 50,
  },
  classContainer1: {
    display: "flex",
    flexDirection: "row",
    borderColor: "#a81313",
    borderWidth: 0.7,
    width: "87%",
    height: "13%",

    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android shadow property
    elevation: 5,
    backgroundColor: "white",
    marginBottom: "6%",
  },
  addButton: {
    width: "70%",
    height: 35, // Aquí puedes ajustar la altura del botón
    backgroundColor: "#253B59",
    color: "white",
    alignSelf: "center",
    overflow: "hidden",
    marginTop: 5,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: 10,
  },
  fullButton:{
    backgroundColor: "#a83238",
  },
  waitlistButton:{
    backgroundColor:"#F29D35",width: "80%",
  },
  disabledButton:{
    backgroundColor:"gray"
  },

  gradient: {
    width: 300,
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
  },
  blurView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

blur: {
  borderRadius: 20,
  display:"flex",
  flexDirection:"row",
  paddingHorizontal: 10,
  overflow: 'hidden',
  backgroundColor:"#2c079255",
  borderWidth: 0, // Grosor del borde
  borderColor:"#6e4da3130",
  width:"85%",
  height:130,
  shadowColor: '#2f00ff',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.8,
  shadowRadius: 10,
  elevation:70,
},
  blurContainer:{
    width:"100%",
    height:200,
alignItems:"center",
  },
  poa:{
width:100,
height:105,
borderRadius:10,
marginTop:"auto",
marginBottom:"auto"
  }
});
