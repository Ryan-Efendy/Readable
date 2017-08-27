import React, { Component } from 'react';
import { Button, Feed, Icon, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Header from './Header';
import SideMenu from './SideMenu';
import Posts from './Posts';
import {
  fetchPosts,
  sortByDate,
  sortByPopularity,
  incrementLikes,
  decrementLikes,
  fetchCategories
} from '../actions';

class DefaultView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCategory: 'All',
      activeSort: 'mostPopular'
    };
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleSortClick = this.handleSortClick.bind(this);
    this.sortBy = this.sortBy.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchCategories();
  }

  handleCategoryClick = (e, { name }) => {
    this.setState({ activeCategory: name });
  };

  handleSortClick = (e, { name }) => {
    debugger;
    this.setState({ activeSort: name });
    //todo: which method if better/more efficient
    name === 'mostPopular'
      ? this.props.sortByPopularity(this.props.posts)
      : this.props.sortByDate(this.props.posts);
    // name === 'mostPopular'
    //   ? _.reverse(_.sortBy(this.props.post, 'voteScore'))
    //   : _.reverse(_.sortBy(this.props.post, 'timestamp'));
  };

  sortBy = posts => {
    return this.state.activeSort === 'mostPopular'
      ? _.reverse(_.sortBy(posts, 'voteScore'))
      : _.reverse(_.sortBy(posts, 'timestamp'));
  };

  //todo: add user profile?
  renderPosts = category => {
    if (!_.isEmpty(this.props.posts)) {
      let posts =
        category !== 'All'
          ? this.sortBy(
              _.filter(this.props.posts, post => post.category === category)
            )
          : this.sortBy(this.props.posts);
      return _.map(posts, post => {
        if (!post.deleted) {
          return (
            <Feed.Event key={post.id}>
              <Feed.Label style={{ width: '7.5em' }}>
                <img src="https://source.unsplash.com/random/73x73" alt="" />
              </Feed.Label>
              <Feed.Content>
                <Feed.Summary>
                  <Feed.User>{post.author}</Feed.User> in <a>{post.category}</a>
                  <Feed.Date>{moment(post.timestamp).fromNow()}</Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                  {post.title}
                </Feed.Extra>
                <Feed.Meta>
                  <Feed.Like
                    onClick={this.props.incrementLikes.bind(null, post.id)}
                  >
                    <Icon name="thumbs up" />
                  </Feed.Like>
                  <Feed.Like
                    onClick={this.props.decrementLikes.bind(null, post.id)}
                  >
                    <Icon name="thumbs down" />
                  </Feed.Like>
                  <Feed.Like>
                    {post.voteScore}
                  </Feed.Like>
                  <Link to={`/show/${post.id}`}>
                    <Button
                      secondary
                      floated="right"
                      size="mini"
                      content="Details"
                      icon="comments"
                      style={{ marginLeft: '1em' }}
                    />
                  </Link>
                  <Link to={`/edit/${post.id}`}>
                    <Button
                      primary
                      floated="right"
                      size="mini"
                      content="Edit"
                      icon="write"
                      style={{ marginLeft: '10em' }}
                    />
                  </Link>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          );
        }
      });
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
        <Header
          onClick={this.handleCategoryClick}
          activeCategory={activeCategory}
        />

        <Grid className="very padded">
          <Grid.Column stretched width={12}>
            <Posts activeCategory={activeCategory} activeSort={activeSort} />
          </Grid.Column>

          <SideMenu onClick={this.handleSortClick} activeSort={activeSort} />
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
    fetchCategories: () => dispatch(fetchCategories()),
    sortByDate: posts => dispatch(sortByDate(posts)),
    sortByPopularity: posts => dispatch(sortByPopularity(posts)),
    incrementLikes: id => dispatch(incrementLikes(id)),
    decrementLikes: id => dispatch(decrementLikes(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultView);
