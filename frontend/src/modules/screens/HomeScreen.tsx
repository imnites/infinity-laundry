import React from 'react';
import useTabs from './hooks/useTabs';
import Tabs from '../components/common/Tabs';

const HomeScreen: React.FC = () => {
  const tabs = useTabs();
  return <Tabs tabs={tabs} />;
};

export default HomeScreen;
