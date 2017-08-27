import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
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
      activeSort: 'mostPopular'
    };
    // this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleSortClick = this.handleSortClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchCategories();
  }

  // handleCategoryClick = (e, { name }) => {
  //   this.setState({ activeCategory: name });
  // };

  handleSortClick = (e, { name }) => {
    this.setState({ activeSort: name });
    //todo: which method if better/more efficient
    name === 'mostPopular'
      ? this.props.sortByPopularity(this.props.posts)
      : this.props.sortByDate(this.props.posts);
    // name === 'mostPopular'
    //   ? _.reverse(_.sortBy(this.props.post, 'voteScore'))
    //   : _.reverse(_.sortBy(this.props.post, 'timestamp'));
  };

  render() {
    const { activeSort } = this.state;
    const { posts, match: { params: { category } } } = this.props;

    if (!posts) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Header category={category} />

        <Grid className="very padded">
          <Grid.Column stretched width={12}>
            <Posts activeCategory={category} activeSort={activeSort} />
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
