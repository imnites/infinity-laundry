import React from 'react';
import {useTabs} from './hooks';
import {Tabs} from '../components/common/components';

const HomeScreen: React.FC = () => {
  const tabs = useTabs();
  return <Tabs tabs={tabs} />;
};

export default HomeScreen;
