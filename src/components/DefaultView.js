import React, { Component } from 'react';
import { Menu, Button, Feed, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchPosts } from '../actions';

class DefaultView extends Component {
  state = {
    activeItem: 'category1'
  };

  componentDidMount() {
    this.props.fetchPosts();
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  renderPosts = () => {
    if (!_.isEmpty(this.props.posts)) {
      return _.map(this.props.posts, post =>
        <Feed.Event>
          <Feed.Label>
            <Icon name="pencil" />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <a>{post.author}</a> {post.title}
              <Feed.Date>{post.timestamp}</Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>
              {post.body}
            </Feed.Extra>
            <Feed.Meta>
              <Feed.Like>
                <Icon name="like" />
                {post.voteScore}
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
      );
    }
  };

  render() {
    const { activeItem } = this.state;
    const { posts } = this.props;

    if (!posts) {
      return <div>Loading...</div>;
    }

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

        <Feed>
          {this.renderPosts()}
        </Feed>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => {
      dispatch(fetchPosts());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultView);
