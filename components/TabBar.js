// CustomTabBar.js
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const TabBar = () => {
    const navigation = useNavigation();
    const route = useRoute(); // Get current route

    const tabs = [
      { name: 'Your Chats', icon: 'chat-bubble-outline' }, // Use the name of the icon
      { name: 'Discover', icon: 'search' } // Use the name of the icon
    ];

    const handleNavigate = (routeName) => {
        // Check if the current route is the same as the one user wants to navigate to
        if (route.name !== routeName) {
            navigation.replace(routeName);
        }
    };

    return (
    //     <View style={styles.tabBarContainer}>
    //     {tabs.map((tab, index) => (
    //     <TouchableOpacity
    //       key={index}
    //       style={[
    //         styles.tab,
    //         route.name === tab.name && styles.activeTab // Apply activeTab styles if the tab is active
    //       ]}
    //       onPress={() => handleNavigate(tab.name)}
    //     >
    //       <View style={[
    //         styles.iconContainer,
    //         route.name === tab.name && styles.activeIconContainer // Apply activeIconContainer styles if the icon is active
    //       ]}>
    //           <MaterialIcons 
    //             name={tab.icon} 
    //             size={24} 
    //             color={route.name === tab.name ? "white" : "white"} 
    //           />
    //       </View>
    //       <Text style={styles.label}>{tab.name}</Text>
    //     </TouchableOpacity>
    //   ))}
    // </View>
    <></>
    );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#808080', // gray
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0', // Light border color
    paddingBottom: 20,
    paddingTop: 10,
  },
  tab: {
    alignItems: 'center',
    padding: 10,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40, // Width of the circle
    height: 40, // Height of the circle
    borderRadius: 5, // Half of width/height to make it a circle
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Slightly transparent white background
    borderRadius: 20, 
  },
  activeIconContainer: {
     // Lighter color for active icon
  },
  label: {
    marginTop: 5,
    fontSize: 12,
    color: '#fff', // Dark label color for contrast
  },
});

const chatBubbleSVG = `
<svg fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 60 60" xml:space="preserve">
<path d="M30,1.5c-16.542,0-30,12.112-30,27c0,5.205,1.647,10.246,4.768,14.604c-0.591,6.537-2.175,11.39-4.475,13.689
	c-0.304,0.304-0.38,0.769-0.188,1.153C0.276,58.289,0.625,58.5,1,58.5c0.046,0,0.093-0.003,0.14-0.01
	c0.405-0.057,9.813-1.412,16.617-5.338C21.622,54.711,25.738,55.5,30,55.5c16.542,0,30-12.112,30-27S46.542,1.5,30,1.5z"/>
</svg>
`;
const magnifyingGlassSVG = `
<svg height="800px" width="800px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 512 512"  xml:space="preserve">
<style type="text/css">
	.st0{fill:#000000;}
</style>
<g>
	<path class="st0" d="M172.625,102.4c-42.674,0-77.392,34.739-77.392,77.438c0,5.932,4.806,10.74,10.733,10.74
		c5.928,0,10.733-4.808,10.733-10.74c0-30.856,25.088-55.959,55.926-55.959c5.928,0,10.733-4.808,10.733-10.74
		C183.358,107.208,178.553,102.4,172.625,102.4z"/>
	<path class="st0" d="M361.657,301.511c19.402-30.436,30.645-66.546,30.645-105.244C392.302,88.036,304.318,0,196.151,0
		c-38.676,0-74.765,11.25-105.182,30.663C66.734,46.123,46.11,66.759,30.659,91.008C11.257,121.444,0,157.568,0,196.267
		c0,108.217,87.998,196.266,196.151,196.266c38.676,0,74.779-11.264,105.197-30.677C325.582,346.396,346.206,325.76,361.657,301.511
		z M259.758,320.242c-19.075,9.842-40.708,15.403-63.607,15.403c-76.797,0-139.296-62.535-139.296-139.378
		c0-22.912,5.558-44.558,15.394-63.644c13.318-25.856,34.483-47.019,60.323-60.331c19.075-9.842,40.694-15.403,63.578-15.403
		c76.812,0,139.296,62.521,139.296,139.378c0,22.898-5.558,44.53-15.394,63.616C306.749,285.739,285.598,306.916,259.758,320.242z"
		/>
	<path class="st0" d="M499.516,439.154L386.275,326.13c-16.119,23.552-36.771,44.202-60.309,60.345l113.241,113.024
		c8.329,8.334,19.246,12.501,30.148,12.501c10.916,0,21.833-4.167,30.162-12.501C516.161,482.83,516.161,455.822,499.516,439.154z"
		/>
</g>
</svg>
`;

export default TabBar;
