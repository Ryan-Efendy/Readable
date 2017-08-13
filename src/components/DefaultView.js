import React, { Component } from 'react';
import { Menu, Button, Feed, Icon, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { fetchPosts, sortByDate, sortByPopularity } from '../actions';

class DefaultView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCategory: 'All',
      activeSort: 'closest'
    };
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleSortClick = this.handleSortClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  handleCategoryClick = (e, { name }) => {
    this.setState({ activeCategory: name });
  };

  handleSortClick = (e, { name }) => {
    this.setState({ activeSort: name });
    name === 'MostRecent'
      ? this.props.sortByDate(this.props.posts)
      : this.props.sortByPopularity(this.props.posts);
  };

  renderPosts = category => {
    if (!_.isEmpty(this.props.posts)) {
      debugger;
      let posts =
        category !== 'All'
          ? _.filter(this.props.posts, post => post.category === category)
          : this.props.posts;
      return _.map(posts, post =>
        <Feed.Event key={post.id}>
          <Feed.Label>
            <Icon bordered name="user" />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>{post.author}</Feed.User> in <a>{post.category}</a>
              <Feed.Date>{moment(post.timestamp).fromNow()}</Feed.Date>
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

  renderCategories = activeCategory => {
    if (!_.isEmpty(this.props.posts)) {
      return this.props.categories.map(category =>
        <Menu.Item
          name={category}
          active={activeCategory === category}
          onClick={this.handleCategoryClick}
          key={category}
        />
      );
    }
  };

  render() {
    const { activeCategory, activeSort } = this.state;
    const { posts } = this.props;

    if (!posts) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Menu tabular inverted>
          <Menu.Item header>Readable</Menu.Item>
          <Menu.Item
            name="All"
            active={activeCategory === 'All'}
            onClick={this.handleCategoryClick}
          />
          {this.renderCategories(activeCategory)}
          <Menu.Menu position="right">
            <Menu.Item>
              <Button primary floated="right">
                Create Post
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Grid className="very padded">
          <Grid.Column stretched width={12}>
            <Feed>
              {this.renderPosts(this.state.activeCategory)}
            </Feed>
          </Grid.Column>

          <Grid.Column width={4}>
            <Menu text vertical>
              <Menu.Item header>Sort By</Menu.Item>
              <Menu.Item
                name="MostRecent"
                active={activeSort === 'mostRecent'}
                onClick={this.handleSortClick}
              />
              <Menu.Item
                name="mostPopular"
                active={activeSort === 'mostPopular'}
                onClick={this.handleSortClick}
              />
            </Menu>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ posts, categories }) => {
  return {
    posts,
    categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    sortByDate: posts => dispatch(sortByDate(posts)),
    sortByPopularity: posts => dispatch(sortByPopularity(posts))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultView);
