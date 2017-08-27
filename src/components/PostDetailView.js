import React, { Component } from 'react';
import { Item, Container, Header, Icon, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  fetchPost,
  deletePost,
  incrementLikes,
  decrementLikes
} from '../actions';
import Comments from './Comments';

class PostDetailView extends Component {
  componentDidMount() {
    // cache: don't eagerly refresh posts check if already fetch posts
    if (!this.props.post) {
      const { id } = this.props.match.params;
      if (id) {
        this.props.fetchPost(id);
      }
    }
  }

  handleDelete = () => {
    const { id } = this.props.match.params;
    const { deletePost, history } = this.props;
    deletePost(id, () => history.push('/'));
  };

  render() {
    const { post } = this.props;
    if (!post) {
      return <div />;
    }
    return (
      <Container text style={{ marginTop: '7em' }}>
        <Header as="h1">Show Post</Header>
        <Item.Group>
          <Item>
            <Item.Image
              size="medium"
              src="https://source.unsplash.com/random/73x73"
            />

            <Item.Content>
              <Item.Header as="a">
                {post.title}
              </Item.Header>
              <Item.Meta>
                <span className="ui small header">
                  {post.author}
                </span>
                <span>
                  {moment(post.timestamp).fromNow()}
                </span>
              </Item.Meta>
              <Item.Description>
                {post.body}
              </Item.Description>
              <Item.Extra>
                <div>
                  <Button
                    attached="left"
                    onClick={this.props.incrementLikes.bind(null, post.id)}
                  >
                    <Icon name="like outline" />
                    like
                  </Button>
                  <Button
                    attached="right"
                    onClick={this.props.decrementLikes.bind(null, post.id)}
                  >
                    <Icon name="dislike outline" />
                    dislike
                  </Button>
                  <Button attached="right" disabled>
                    {post.voteScore}
                  </Button>
                </div>
              </Item.Extra>
              <Item.Extra>
                <Link to={`/edit/${post.id}`}>
                  <Button
                    positive
                    content="Edit"
                    icon="edit"
                    labelPosition="left"
                  />
                </Link>
                <Button
                  negative
                  content="Delete"
                  icon="delete"
                  labelPosition="left"
                  onClick={this.handleDelete.bind(this)}
                />
              </Item.Extra>
              <Comments id={post.id} />
            </Item.Content>
          </Item>
        </Item.Group>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.posts[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, {
  fetchPost,
  deletePost,
  incrementLikes,
  decrementLikes
})(PostDetailView);
