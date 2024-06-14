import React, { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from "../home";
import Club from "../club";
import Leagues from "../leagues";
import Watchlist from "../watchlist";
import Profile from "../profile";

const Tab=createBottomTabNavigator()

const Bottomnavigation:FC=()=>{
    return(
        <Tab.Navigator screenOptions={{headerShown:false}} >
            <Tab.Screen name="Dashboard" component={Home} options={{
            tabBarIcon: ({ color }) => (
              <Image
                source={require('../../assets/home.png')}
                style={[styles.tabIcon, { tintColor: color }]}                
              />
            ),
          }} />
            <Tab.Screen name="Watchlist" component={Watchlist} options={{
            tabBarIcon: ({ color }) => (
              <Image
                source={require('../../assets/bookmark.png')}
                style={[styles.tabIcon, { tintColor: color }]}                
              />
            ),
          }}  />
            <Tab.Screen name="Profile" component={Profile} options={{
            tabBarIcon: ({ color }) => (
              <Image
                source={require('../../assets/user.png')}
                style={[styles.tabIcon, { tintColor: color }]}                
              />
            ),
          }}  />
        </Tab.Navigator>
    )
}


export default Bottomnavigation


const styles = StyleSheet.create({
   
    tabIcon: {
      width: 25,
      height: 25,
    },
  });