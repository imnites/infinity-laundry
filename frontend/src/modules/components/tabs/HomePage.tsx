import React from 'react';
import {useTabs} from '../../screens/hooks';
import {Tabs} from '../common/components';

const HomePage: React.FC = () => {
  const tabs = useTabs();
  return <Tabs tabs={tabs} />;
};

export default HomePage;
