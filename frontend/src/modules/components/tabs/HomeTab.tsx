import React from 'react';
import MachineUsage from './components/MachineUsage';
import PersonalDetails from './components/PersonalDetails';

const HomeTab: React.FC = () => {
  return (
    <>
      <PersonalDetails />
      <MachineUsage />
    </>
  );
};

export default HomeTab;
