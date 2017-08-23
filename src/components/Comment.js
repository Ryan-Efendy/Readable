import React, { Component } from 'react';
import { Button, Comment, Form, Header, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchComment } from '../actions';

class CommentExampleComment extends Component {
  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this.props.fetchComment(id);
    }
  }

  renderComments = () => {
    const { comments } = this.props;
    return comments.map(comment =>
      <Comment key={comment.id}>
        <Comment.Avatar src="https://source.unsplash.com/random/73x73" />
        <Comment.Content>
          <Comment.Author as="a">
            {comment.author}
          </Comment.Author>
          <Comment.Metadata>
            <div>
              {moment(comment.timestamp).fromNow()}
            </div>
          </Comment.Metadata>
          <Comment.Text>
            {comment.body}
          </Comment.Text>
          <Comment.Actions>
            <Comment.Action>
              <Icon name="thumbs up" />
            </Comment.Action>
            <Comment.Action>
              <Icon name="thumbs down" />
            </Comment.Action>
            <Comment.Action>
              {comment.voteScore}
            </Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    );
  };

  render() {
    const { comments } = this.props;
    debugger;
    if (!comments) {
      return <div />;
    }
    return (
      <Comment.Group>
        <Header as="h3" dividing>
          Comments
        </Header>

        {this.renderComments()}

        <Form reply>
          <Form.TextArea />
          <Button
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
      </Comment.Group>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    comments: state.posts[ownProps.id].comments
  };
};

export default connect(mapStateToProps, { fetchComment })(
  CommentExampleComment
);
