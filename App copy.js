import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import AuthScreen from './components/AuthScreen';
import { UserProvider } from './components/UserContext';
import TabNavigator from './components/TabNavigator';
import { StyleSheet,Easing } from 'react-native';
import CharacterChatScreen from './components/CharacterChatScreen';
import CharacterProfileScreen from './components/CharacterProfileScreen';
import EditCharacterScreen from './components/EditCharacterScreen';
import PackageScreen from './components/PackageScreen';
import UserProfileScreen from './components/UserProfileScreen';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  screenOptions: {
    headerStyle: {
      backgroundColor: '#1F1F1F', // Dark background color for the header
    },
    colors: {
      background: '#191919',
    },
    
    headerTintColor: '#fff', // White color for the header title and buttons
    headerTitleStyle: {
      fontWeight: 'bold', // Optional: if you want the title to be bold
    },
  },
});



export default function App() {
  return (
    <UserProvider>

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            ...styles.screenOptions,
            gestureEnabled: true, // if you want to enable gesture navigation
          }}
        >
          <Stack.Screen
            name="Login"
            component={AuthScreen}
            options={{
              ...leftToRightAnimation, // default iOS animation
            }}
          />
          <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
          {/* <Stack.Screen
            name="Your Chats"
            component={HomeScreen}
            options={{
              ...leftToRightAnimation, // default iOS animation
            }}
          /> */}
          <Stack.Screen
            name="Chat"
            component={CharacterChatScreen}
            // options={{
            //   ...rightToLeftAnimation, // custom animation example
            // }}
          />
          <Stack.Screen
            name="CharacterProfile"
            component={CharacterProfileScreen}
          />
          <Stack.Screen
            name="EditCharacter"
            component={EditCharacterScreen}
          />
          <Stack.Screen
            name="Packages"
            component={PackageScreen}
          />
          <Stack.Screen
            name="Profile"
            component={UserProfileScreen}
          />
          {/* <Stack.Screen
            name="Discover"
            component={DiscoverScreen}
            options={{
              ...rightToLeftAnimation // default iOS animation
            }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>

    </UserProvider>
  );
}


const rightToLeftAnimation = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
      },
    },
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          // Apply a transform to the next (underlying) screen
          {
            translateX: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -100], // Adjust the value to control how much the underlying screen should move
                })
              : 0,
          },
        ],
      },
    };
  },
};

const leftToRightAnimation = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
      },
    },
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [-layouts.screen.width, 0],
            }),
          },
          // Apply a transform to the next (underlying) screen
          {
            translateX: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 100], // Adjust the value to control how much the underlying screen should move
                })
              : 0,
          },
        ],
      },
    };
  },
};
