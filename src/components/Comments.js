import React, { Component } from 'react';
import {
  Button,
  Comment,
  Form,
  Header,
  Icon,
  Item,
  Label
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import uuidv1 from 'uuid/v1';
import _ from 'lodash';
import {
  fetchComments,
  createComment,
  incrementCommentLikes,
  decrementCommentLikes,
  deleteComment
} from '../actions';
import EditCommentModal from './EditCommentModal';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = { modalOpen: false, sortBy: 'voteScore' };
  }

  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this.props.fetchComments(id);
    }
  }

  submit = values => {
    const { createComment, id, reset } = this.props;
    values.id = uuidv1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'
    values.timestamp = Date.now();
    values.parentId = id;
    createComment(values).then(() => reset());
  };

  handleDelete = (postId, commentId) => {
    const { deleteComment } = this.props;
    deleteComment(postId, commentId);
  };

  renderComments = () => {
    const { comments, id } = this.props;
    const { sortBy } = this.state;
    debugger;
    return _.map(_.reverse(_.sortBy(comments, sortBy)), comment => {
      if (!comment.deleted)
        return (
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
                <Comment.Action
                  onClick={this.props.incrementCommentLikes.bind(
                    null,
                    id,
                    comment.id
                  )}
                >
                  <Icon name="thumbs up" />
                </Comment.Action>
                <Comment.Action>
                  <Icon
                    name="thumbs down"
                    onClick={this.props.decrementCommentLikes.bind(
                      null,
                      id,
                      comment.id
                    )}
                  />
                </Comment.Action>
                <Comment.Action>
                  {comment.voteScore}
                </Comment.Action>
                <div style={{ marginLeft: 125 }}>
                  <EditCommentModal postId={id} commentId={comment.id} />
                  <Button
                    negative
                    content="Delete"
                    icon="delete"
                    size="mini"
                    onClick={this.handleDelete.bind(this, id, comment.id)}
                  />
                </div>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        );
    });
  };

  renderField = ({ input, label, type, meta: { touched, error } }) => {
    let userMessage;
    if (touched && error) {
      userMessage = (
        <Form.Input
          label={label}
          placeholder={label}
          type={type}
          {...input}
          error
        />
      );
    } else {
      userMessage = (
        <Form.Input label={label} placeholder={label} type={type} {...input} />
      );
    }
    return (
      <div>
        {userMessage}
        <div className="text-danger">
          {touched ? error : ''}
        </div>
      </div>
    );
  };

  renderTextArea = ({ input, label, meta: { touched, error } }) => {
    let userMessage;
    if (touched && error) {
      userMessage = (
        <Form.TextArea label={label} placeholder={label} {...input} error />
      );
    } else {
      userMessage = (
        <Form.TextArea label={label} placeholder={label} {...input} />
      );
    }
    return (
      <div>
        {userMessage}
        <div className="text-danger">
          {touched ? error : ''}
        </div>
      </div>
    );
  };

  //todo: if there's no comment still need to render comment box
  render() {
    const { comments, handleSubmit } = this.props;
    if (!comments) {
      return <div />;
    }
    return (
      <Comment.Group>
        <Header as="h3" dividing>
          Comments
        </Header>

        <Item.Extra>
          <Label
            icon="users"
            as="a"
            content="Most Popular"
            onClick={() => this.setState({ sortBy: 'voteScore' })}
          />
          <Label
            icon="time"
            as="a"
            content="Most Recent"
            onClick={() => this.setState({ sortBy: 'timestamp' })}
          />
        </Item.Extra>

        {this.renderComments()}

        <Form reply onSubmit={handleSubmit(this.submit)}>
          <Field
            name="body"
            label="Enter comment"
            component={this.renderTextArea}
          />
          <Field
            name="author"
            type="text"
            label="Enter author"
            component={this.renderField}
          />

          <Button
            content="Add Comment"
            labelPosition="left"
            icon="add"
            type="submit"
            primary
          />
          <Link to="/">
            <Button content="Back" icon="home" labelPosition="left" secondary />
          </Link>
        </Form>
      </Comment.Group>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.body) {
    errors.body = 'Enter a comment';
  }
  if (!values.author) {
    errors.author = 'Enter a author';
  }
  return errors;
}

const mapStateToProps = (state, ownProps) => {
  return {
    comments: state.posts[ownProps.id].comments
  };
};

export default reduxForm({
  form: 'commentForm', // need to be unique
  // destroyOnUnmount: false,
  validate
})(
  connect(mapStateToProps, {
    fetchComments,
    createComment,
    incrementCommentLikes,
    decrementCommentLikes,
    deleteComment
  })(Comments)
);
