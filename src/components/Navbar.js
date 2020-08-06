import React from 'react';
import { Menu } from 'semantic-ui-react';

const Navbar = ({ page, handlePage }) => {
  return (
    <Menu size="large" stackable>
      <Menu.Menu position="right">
        <Menu.Item
          name="planets"
          active={page === 'planets'}
          onClick={() => handlePage('planets')}
        >
          Planets
        </Menu.Item>
        <Menu.Item
          name="people"
          active={page === 'people'}
          onClick={() => handlePage('people')}
        >
          People
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
