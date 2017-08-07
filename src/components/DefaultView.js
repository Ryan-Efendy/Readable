import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';

export default class DefaultView extends Component {
  state = {
    activeItem: 'category1'
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu tabular inverted>
          <Menu.Item header>Readable</Menu.Item>
          <Menu.Item
            name="category1"
            active={activeItem === 'category1'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="category2"
            active={activeItem === 'category2'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="category3"
            active={activeItem === 'category3'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position="right">
            <Menu.Item>
              <Button primary floated="right">
                Create Post
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
