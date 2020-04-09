import * as React from 'react';
import {Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import About from "./src/components/About";
import AddNewEvent from "./src/components/AddNewEvent";
import Events from "./src/components/Events";
import Login from "./src/components/Login";
import People from "./src/components/People";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function EventPage() {
    return (
        <Stack.Navigator
            initialRouteName="Events"
            headerMode="none"
        >
            <Stack.Screen name="Events" component={Events} />
            <Stack.Screen name="Add" component={AddNewEvent} />
        </Stack.Navigator>
    );
}

function PeoplePage() {
    return (
        <Stack.Navigator
            initialRouteName="People"
            headerMode="none"
        >
            <Stack.Screen name="People" component={People} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="About" component={About} />
        </Stack.Navigator>
    );
}

export default class App extends React.Component<any, any>
{
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarLabel: ({ focused, color }) => {
                            return <Text style={{color: '#525252', fontSize: 18, fontWeight: 'bold', marginBottom: 14}}>{route.name === 'Events' ? 'Расписание' : 'Клирики'}</Text>;
                        }
                    })}
                    tabBarOptions={{
                        inactiveBackgroundColor: '#FFFBF2',
                        activeBackgroundColor: '#EBD1AD',
                        showIcon: null
                    }}
                >
                    <Tab.Screen name="Events" component={EventPage} />
                    <Tab.Screen name="People" component={PeoplePage} />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}
