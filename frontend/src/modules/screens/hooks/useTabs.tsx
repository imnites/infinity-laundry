import React from 'react';
import {HomeTab, MachineTab, StatusTab} from '../../components/tabs';
import {TabIcon} from '../../components/common/components';

interface TabsReturnType {
  id: number;
  name: string;
  component: React.ComponentType;
  options: any;
}

const useTabs = (): TabsReturnType[] => {
  return [
    {
      id: 1,
      name: 'Home',
      component: HomeTab,
      options: {
        headerShown: false,
        tabBarIcon: () => <TabIcon name="home" color="#000" size={24} />,
      },
    },
    {
      id: 2,
      name: 'Use Machine',
      component: MachineTab,
      options: {
        headerShown: false,
        tabBarIcon: () => <TabIcon name="cog" color="#000" size={24} />,
      },
    },
    {
      id: 3,
      name: 'Status',
      component: StatusTab,
      options: {
        headerShown: false,
        tabBarIcon: () => <TabIcon name="signal" color="#000" size={24} />,
      },
    },
  ];
};

export default useTabs;
