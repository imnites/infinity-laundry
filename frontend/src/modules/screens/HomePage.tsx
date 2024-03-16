import React from 'react';
import {useTabs} from './hooks';
import {Tabs} from '../components/common/components';

const HomePage: React.FC = () => {
  const tabs = useTabs();
  return <Tabs tabs={tabs} />;
};

export default HomePage;
