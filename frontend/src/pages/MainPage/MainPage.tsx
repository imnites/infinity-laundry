/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomePage} from './tabs';
import {SidePanel} from '~/components/sidepanel';
import DrawerToggleButton from './DrawerToggleButton';

const Drawer = createDrawerNavigator();

const TabNavigator: React.FC = () => <HomePage />;

const MainPage: React.FC = () => (
  <Drawer.Navigator
    drawerContent={() => <SidePanel />}
    screenOptions={({navigation}) => ({
      headerLeft: () => (
        <DrawerToggleButton onPress={navigation.toggleDrawer} />
      ),
      drawerStyle: {width: 240}
    })}>
    <Drawer.Screen
      name="Main"
      component={TabNavigator}
      options={{
        headerTitle: ''
      }}
    />
  </Drawer.Navigator>
);

export default MainPage;
