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
    this.state = { sortBy: 'voteScore' };
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
    return _.map(_.reverse(_.sortBy(comments, sortBy)), comment => {
      if (!comment.deleted)
        return (
          <Comment key={comment.id}>
            <Comment.Avatar src="https://source.unsplash.com/random/73x73" />
            <Comment.Content>
              <Comment.Author as="a">{comment.author}</Comment.Author>
              <Comment.Metadata>
                <div>{moment(comment.timestamp).fromNow()}</div>
              </Comment.Metadata>
              <Comment.Text>{comment.body}</Comment.Text>
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
                <Comment.Action>{comment.voteScore}</Comment.Action>
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
        <div className="text-danger">{touched ? error : ''}</div>
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
        <div className="text-danger">{touched ? error : ''}</div>
      </div>
    );
  };

  renderForm = () => (
    <Form reply onSubmit={this.props.handleSubmit(this.submit)}>
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
  );

  render() {
    const { comments } = this.props;
    if (!comments) {
      return <div>{this.renderForm()}</div>;
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

        {this.renderForm()}
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
/*
* Suggestion:
There is a cleaner way to add singular actions to your container, with ES6 techniques.

For singular actions, you can do the following to completely avoid utilizing the mapDispatchToProps function:

export default connect(mapStateToProps, {action1, action2})(Component);
This adds the action creators to your this.props object without the need to utilize the mapStateToProps method :muscle:
*/
const mapStateToProps = (state, ownProps) => ({
  comments: state.posts[ownProps.id].comments
});

/*
Suggestion:
If you want to pass multiple action creators into your container, you can do so by first importing your actions utilizing the following import method:

Import * as actions from ‘../actions/action1’;
The above selects ALL your actions within a specific action creator module, and adds them to this.props

To connect this with your container, you just write the following:

export default connect(mapStateToProps, actions)(Component);
This adds all the action creators within the actions module, to your container
*/
export default reduxForm({
  form: 'commentForm', // need to be unique
  // destroyOnUnmount: false,
  validate
})(
  connect(
    mapStateToProps,
    {
      fetchComments,
      createComment,
      incrementCommentLikes,
      decrementCommentLikes,
      deleteComment
    }
  )(Comments)
);
