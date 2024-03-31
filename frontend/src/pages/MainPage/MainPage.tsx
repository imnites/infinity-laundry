/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomePage} from './tabs';
import {SidePanel} from '~/components/sidepanel';
import DrawerToggleButton from './DrawerToggleButton';
import {useMeContext} from '~/me';
import {Redirect} from '~/components/common';

const Drawer = createDrawerNavigator();

const TabNavigator: React.FC = () => <HomePage />;

const MainPage: React.FC = () => {
  const {me} = useMeContext();

  if (!me) {
    <Redirect to="LoginPage" />;
  }

  return (
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
};

export default MainPage;
