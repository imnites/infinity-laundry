import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomePage} from '~/modules/tabs';
import {SidePanel} from '~/modules/sidepanel';

const Drawer = createDrawerNavigator();

const TabNavigator: React.FC = () => <HomePage />;

const MainPage: React.FC = () => (
  <Drawer.Navigator
    drawerContent={() => <SidePanel />}
    screenOptions={{drawerStyle: {width: 200}}}>
    <Drawer.Screen name="Main" component={TabNavigator} />
  </Drawer.Navigator>
);

export default MainPage;
