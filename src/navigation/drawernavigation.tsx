import React, { FC } from "react";
import { View ,Text} from "react-native";
import {createDrawerNavigator,DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer'
import Home from "../home";
import Bottomnavigation from "./bottomnavigation";
import Activity from "../Activity";
import Drawerheader from "../drawerheader";

const Drawer=createDrawerNavigator()

const Drawernavigation:FC=()=>{
    return(
       <Drawer.Navigator screenOptions={{headerShown:false}} 
    //    drawerContent={(props)=><DrawerContentScrollView {...props}>
    //         <Drawerheader navigation={props.navigation} />
    //         <DrawerItemList {...props} />
    //     </DrawerContentScrollView>}
         >
        <Drawer.Screen name=" " component={Bottomnavigation} />
        <Drawer.Screen name="Activity" component={Activity} />
       </Drawer.Navigator>
    )

}

export default Drawernavigation