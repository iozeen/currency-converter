import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const tabsList = [
  { label: 'Currency converter', to: '/' },
  { label: 'Currencies', to: '/currencies' },
];

function AppBarComponent() {
  const { pathname } = useLocation();
  const initialTabValue = pathname
    ? tabsList
      .map(({ to }) => to)
      .indexOf(pathname)
    : 0;
  const [value, setValue] = React.useState(initialTabValue);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        centered
      >
        {tabsList.map(({ label, to }) => <Tab key={to} label={label} component={Link} to={to} />)}
      </Tabs>
    </AppBar>
  );
}

export default AppBarComponent;
