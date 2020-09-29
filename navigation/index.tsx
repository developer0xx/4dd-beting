import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {ColorSchemeName, Platform} from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import Invoice from '@/screens/Invoice';
import Round from '@/screens/Round';
import Record from '@/screens/Record';
import PlayerLogin from '@/screens/Auth/Player/Login';
import PlayerSignup from '@/screens/Auth/Player/Signup';
import AgentLogin from '@/screens/Auth/Agent';
import {RootStackParamList} from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import Home from '@/screens/web/Home';
import {Screens} from "../constants/Navigation";
import {useStores} from "../hooks/Utils";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    const initialState = {routes: Screens.home};
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
    const {user} = useStores();
    let initialRoute = "";
    if(user.isValid()) {
        initialRoute = Screens.home
    }
    else {
        initialRoute = Screens.playerlogin;
    }
    if (Platform.OS === 'web') {
        return (
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
            </Stack.Navigator>
        )
    } else {
        return (
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={initialRoute}>
                <Stack.Screen name={Screens.playerlogin} component={PlayerLogin}/>
                <Stack.Screen name={Screens.agentlogin} component={AgentLogin}/>
                <Stack.Screen name={Screens.playersignup} component={PlayerSignup}/>
                <Stack.Screen name={Screens.home} component={BottomTabNavigator}/>
                <Stack.Screen name={Screens.invoice} component={Invoice}/>
                <Stack.Screen name={Screens.record} component={Record}/>
                <Stack.Screen name={Screens.round} component={Round}/>
                <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
            </Stack.Navigator>
        );
    }

}
