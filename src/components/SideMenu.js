import React from 'react';
import { Grid, Menu } from 'semantic-ui-react';

const SideMenu = props =>
  <Grid.Column width={4}>
    <Menu text vertical>
      <Menu.Item header>Sort By</Menu.Item>
      <Menu.Item
        name="mostPopular"
        active={props.activeSort === 'mostPopular'}
        onClick={props.onClick}
      />
      <Menu.Item
        name="MostRecent"
        active={props.activeSort === 'mostRecent'}
        onClick={props.onClick}
      />
    </Menu>
  </Grid.Column>;

export default SideMenu;
