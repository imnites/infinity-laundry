import HomeTab from '../../components/tabs/HomeTab';
import MachineTab from '../../components/tabs/MachineTab';
import StatusTab from '../../components/tabs/StatusTab';

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
      },
    },
    {
      id: 2,
      name: 'Use Machine',
      component: MachineTab,
      options: {
        headerShown: false,
      },
    },
    {
      id: 3,
      name: 'Status',
      component: StatusTab,
      options: {
        headerShown: false,
      },
    },
  ];
};

export default useTabs;
