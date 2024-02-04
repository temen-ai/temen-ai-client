import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import DiscoverScreen from './DiscoverScreen';
import AddCharacterScreen from './AddCharacterScreen';
// import UserProfileScreen from './UserProfileScreen'; // Import the UserProfileScreen
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, StyleSheet, View,Text } from 'react-native';
import { useUser } from './UserContext';
import { useEffect } from 'react';

const Tab = createBottomTabNavigator();



const renderHeaderLeft = (navigation) => (
  <TouchableOpacity onPress={() => navigation.navigate('Packages')} style={styles.premiumButton}>
    <Text style={styles.premiumText}>Premium +</Text>
  </TouchableOpacity>
);

const renderHeaderRight = (navigation,user) => (
  <TouchableOpacity onPress={() => navigation.navigate('Profile',{user:user})}>
    <View style={styles.profileIcon}>
      <MaterialIcons name="person" size={24} color="#000" />
    </View>
  </TouchableOpacity>
);
const tabStyle = {
  headerStyle: {
    backgroundColor: '#1F1F1F', // Dark background for the header
  },
  headerTitleStyle: {
    color: '#fff', // Light text
  },
  tabBarStyle: { backgroundColor: '#1F1F1F' },
  tabBarActiveTintColor: '#fff',
  tabBarInactiveTintColor: 'gray',
  headerShown: true,
  headerTitle: 'TEMEN.AI',
};

const TabNavigator = ({ navigation }) => {
  const { user } = useUser();
  console.log(user,"hadeh");
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...getScreenOptions(route),
        ...tabStyle,
        headerLeft: ()=> renderHeaderLeft(navigation),
        headerRight: () => renderHeaderRight(navigation,user),
      })}
      sceneContainerStyle={{
        backgroundColor: '#191919',
      }}
    >
      {/* Tab Screens */}
      <Tab.Screen 
        name="Your Chats" 
        component={HomeScreen}
      />
      <Tab.Screen 
        name="Add Character" 
        component={AddCharacterScreen}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
      />
      {/* UserProfileScreen, if it's a tab */}
      {/* <Tab.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
      /> */}
    </Tab.Navigator>
  );
};

// Function to return the screen options including the icons
const getScreenOptions = (route) => {
    let iconName;
    let animationStyle;
  
    switch (route.name) {
      case 'Your Chats':
        iconName = 'chat'; // Replace with your icon name
        animationStyle = leftToRightAnimation;
        break;
      case 'Discover':
        iconName = 'search'; // Replace with your icon name
        animationStyle = rightToLeftAnimation;
        break;
      case 'Add Character':
        iconName = 'add'; // Replace with your icon name
        break;
      default:
        iconName = 'info'; // A default icon
    }
  
    return {
      tabBarIcon: ({ color, size }) => (
        <MaterialIcons name={iconName} size={size} color={color} />
      ),
      ...animationStyle,
    };
  };

const styles = StyleSheet.create({
    tabContainer: {
      width: '100%',
      maxWidth: 500,
      alignSelf: 'center', // This centers the tab navigator in the screen
    },
    profileIcon: {
      marginRight: 15,
      padding: 2,
      borderRadius: 50,
      backgroundColor: '#e0e0e0', // Grey circle background
    },
    premiumButton: {
      marginLeft: 15,
      backgroundColor: '#B59410', // Gold color
      borderRadius: 20,
      paddingVertical: 5,
      paddingHorizontal: 15,
    },
    premiumText: {
      color: '#fff', // White text
      fontWeight: 'bold',
    },
});   

const rightToLeftAnimation = {}
const leftToRightAnimation = {}
// const rightToLeftAnimation = {
//     gestureDirection: 'horizontal',
//     transitionSpec: {
//         open: {
//         animation: 'timing',
//         config: {
//             duration: 300,
//             easing: Easing.out(Easing.poly(4)),
//         },
//         },
//         close: {
//         animation: 'timing',
//         config: {
//             duration: 300,
//             easing: Easing.out(Easing.poly(4)),
//         },
//         },
//     },
//     cardStyleInterpolator: ({ current, next, layouts }) => {
//         return {
//         cardStyle: {
//             transform: [
//             {
//                 translateX: current.progress.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [layouts.screen.width, 0],
//                 }),
//             },
//             // Apply a transform to the next (underlying) screen
//             {
//                 translateX: next
//                 ? next.progress.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [0, -100], // Adjust the value to control how much the underlying screen should move
//                     })
//                 : 0,
//             },
//             ],
//         },
//         };
//     },
// };

// const leftToRightAnimation = {
//     gestureDirection: 'horizontal',
//     transitionSpec: {
//         open: {
//         animation: 'timing',
//         config: {
//             duration: 300,
//             easing: Easing.out(Easing.poly(4)),
//         },
//         },
//         close: {
//         animation: 'timing',
//         config: {
//             duration: 300,
//             easing: Easing.out(Easing.poly(4)),
//         },
//         },
//     },
//     cardStyleInterpolator: ({ current, next, layouts }) => {
//         return {
//         cardStyle: {
//             transform: [
//             {
//                 translateX: current.progress.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [-layouts.screen.width, 0],
//                 }),
//             },
//             // Apply a transform to the next (underlying) screen
//             {
//                 translateX: next
//                 ? next.progress.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [0, 100], // Adjust the value to control how much the underlying screen should move
//                     })
//                 : 0,
//             },
//             ],
//         },
//         };
//     },
// };

  
export default TabNavigator;
