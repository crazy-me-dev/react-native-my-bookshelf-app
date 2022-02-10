import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ProfileScreen from '../screens/profile/ProfileScreen';
import BestSellersScreen from '../screens/sellers/BestSellersScreen';
import TabOneScreen from '../screens/sellers/BestSellersScreen';
import ShoppingListScreen from '../screens/shopping/ShoppingListScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList } from './RootNavigator';

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export type RootTabParamList = {
  BestSellers: undefined;
  ShoppingList: undefined;
  Profile: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="BestSellers"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="BestSellers"
        component={BestSellersScreen}
        options={({ navigation }: RootTabScreenProps<'BestSellers'>) => ({
          title: 'Best Sellers',
          tabBarIcon: ({ color }) => <MaterialIcons name="thumb-up" size={24} color={color} />,
        })}
      />
      <BottomTab.Screen
        name="ShoppingList"
        component={ShoppingListScreen}
        options={{
          title: 'Shopping List',
          tabBarIcon: ({ color }) => <MaterialIcons name="shopping-cart" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}
