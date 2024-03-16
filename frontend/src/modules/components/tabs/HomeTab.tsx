import React from 'react';
import {MachineUsage, PersonalDetails} from './components';

const HomeTab: React.FC = () => {
  return (
    <>
      <PersonalDetails />
      <MachineUsage />
    </>
  );
};

export default HomeTab;
