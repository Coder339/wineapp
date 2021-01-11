import React, { useEffect,useState,useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  Animated,
  TouchableOpacity,
  
} from "react-native";
import { fonts } from "../assets/globalstyleconstants";
// import { FlatList } from "react-native-gesture-handler";

export default function Animate() {
    
  let pan = new Animated.ValueXY();
  

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ]
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;



  const panStyle = {
    transform: [{ translateX: pan.x }, { translateY: pan.y }]
  }

  
  return (
      <Animated.View
        {...panResponder.panHandlers}
        style={[panStyle]}
      >  
        <TouchableOpacity onPress={()=>alert('hello')} style={styles.circle}>
          <Text style={styles.drag}>DRAG ME</Text>
        </TouchableOpacity>
        
      </Animated.View>
  );

}

let CIRCLE_RADIUS = 30;
const styles = StyleSheet.create({
  circle: {
    // flex:1,
    backgroundColor: "blue",
    width: CIRCLE_RADIUS * 3,
    height: CIRCLE_RADIUS * 3,
    borderRadius: CIRCLE_RADIUS+40,
    justifyContent:'center',
    alignItems:'center',
    elevation:1,
  },
  drag:{
    color:'white',
    fontFamily:fonts.FasterOneRegular,
    fontSize:14
  },
});