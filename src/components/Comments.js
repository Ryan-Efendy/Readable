import React, { Component } from 'react';
import { Button, Comment, Form, Header, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import uuidv1 from 'uuid/v1';
import { fetchComment, createComment } from '../actions';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this.props.fetchComment(id);
    }
  }

  submit = values => {
    const { createComment, id } = this.props;
    values.id = uuidv1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'
    values.timestamp = Date.now();
    values.parentId = id;
    createComment(values);
  };

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

        {this.renderComments()}

        <Form reply onSubmit={handleSubmit(this.submit)}>
          <Field
            name="body"
            label="Enter comment"
            component={this.renderTextArea}
          />
          <Field
            name="owner"
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
  if (!values.owner) {
    errors.owner = 'Enter a author';
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
  validate
})(connect(mapStateToProps, { fetchComment, createComment })(Comments));
