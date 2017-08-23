import React, { Component } from 'react';
import { Item, Container, Header, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchPost } from '../actions';
import Comment from './Comment';

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
                <span>
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
                <Icon name="like" />
                {post.voteScore}
              </Item.Extra>
              <Comment id={post.id} />
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

export default connect(mapStateToProps, { fetchPost })(PostDetailView);
