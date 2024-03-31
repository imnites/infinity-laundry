import React from 'react';
import {HomeTab} from './HomeTab';
import MachineTab from './MachineTab';
import StatusTab from './StatusTab';
import HistoryTab from './history-tab/HistoryTab';
import {TabIcon} from '~/components/common';
import {Tabs} from '~/components/common';

interface TabsReturnType {
  id: number;
  name: string;
  component: React.FC<any>;
  options: any;
}

const tabs: TabsReturnType[] = [
  {
    id: 1,
    name: 'Home',
    component: HomeTab,
    options: {
      headerShown: false,
      tabBarIcon: () => <TabIcon name="home" color="#000" size={24} />
    }
  },
  {
    id: 2,
    name: 'Use Machine',
    component: MachineTab,
    options: {
      headerShown: false,
      tabBarIcon: () => <TabIcon name="cog" color="#000" size={24} />
    }
  },
  {
    id: 3,
    name: 'Status',
    component: StatusTab,
    options: {
      headerShown: false,
      tabBarIcon: () => <TabIcon name="signal" color="#000" size={24} />
    }
  },
  {
    id: 4,
    name: 'History',
    component: HistoryTab,
    options: {
      headerShown: false,
      tabBarIcon: () => <TabIcon name="history" color="#000" size={24} />
    }
  }
];

const HomePage: React.FC = () => {
  return <Tabs tabs={tabs} />;
};

export default HomePage;
