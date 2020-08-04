import React from 'react';
import { Button, Menu } from 'semantic-ui-react';

const Navbar = ({ page, setPage }) => {
  return (
    <Menu size="large">
      <Menu.Menu position="right">
        <Menu.Item
          name="planets"
          active={page === 'planets'}
          onClick={() => setPage('planets')}
        >
          <Button secondary>Planets</Button>
        </Menu.Item>
        <Menu.Item
          name="people"
          active={page === 'people'}
          onClick={() => setPage('people')}
        >
          <Button secondary>People</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
