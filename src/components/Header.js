import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../actions';

class Header extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  //todo: should i cache categories since is also used in CreateEditView
  renderCategories = activeCategory => {
    if (!_.isEmpty(this.props.categories)) {
      return this.props.categories.map(category =>
        <Menu.Item
          name={category}
          active={activeCategory === category}
          onClick={this.props.onClick}
          key={category}
        />
      );
    }
  };

  render() {
    return (
      <Menu tabular inverted>
        <Menu.Item header>Readable</Menu.Item>
        <Menu.Item
          name="All"
          active={this.props.activeCategory === 'All'}
          onClick={this.props.onClick}
          key="All"
        />
        {this.renderCategories(this.props.activeCategory)}
        <Menu.Menu position="right">
          <Menu.Item>
            <Link to="/create">
              <Button primary floated="right">
                Create Post
              </Button>
            </Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
