import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

interface TabsProps {
  tabs: Tabs[];
}

interface Tabs {
  id: number;
  name: string;
  component: React.ComponentType;
  options: any;
}

const Tab = createBottomTabNavigator();

const Tabs: React.FC<TabsProps> = ({tabs}) => {
  return (
    <Tab.Navigator>
      {tabs.map(tab => (
        <Tab.Screen
          key={tab.id}
          name={tab.name}
          component={tab.component}
          options={tab.options}
        />
      ))}
    </Tab.Navigator>
  );
};

export default Tabs;
