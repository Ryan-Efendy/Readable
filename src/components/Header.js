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
        <Link to={`/${category}`} key={category}>
          <Menu.Item
            name={category}
            active={activeCategory === category}
            onClick={this.props.onClick}
            as="button"
          />
        </Link>
      );
    }
  };

  //todo: need to render based on /:category
  render() {
    const { category } = this.props;
    return (
      <Menu tabular inverted>
        <Link to="/" key="Home">
          <Menu.Item header as="button">
            Readable
          </Menu.Item>
        </Link>
        <Link to="/all" key="all">
          <Menu.Item
            name="All"
            active={category === 'all'}
            onClick={this.props.onClick}
            as="button"
          />
        </Link>
        {this.renderCategories(category)}
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
