import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchComments, updateComment } from '../actions';

class EditCommentModal extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  submit = values => {
    const { updateComment, commentId } = this.props;
    const updateValues = {};
    updateValues.author = values.author;
    updateValues.body = values.body;
    updateComment(commentId, updateValues, () => this.handleClose());
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const { modalOpen } = this.state;
    return (
      <Modal
        trigger={
          <Button
            positive
            content="Edit"
            icon="edit"
            size="mini"
            labelPosition="left"
            onClick={this.handleOpen}
          />
        }
        size="mini"
        open={modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Edit Comment</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <form onSubmit={handleSubmit(this.submit)}>
              <div>
                <label>Author</label>
                <div>
                  <Field
                    name="author"
                    component="input"
                    type="text"
                    placeholder="Enter author"
                  />
                </div>
                <label>Comment</label>
                <div>
                  <Field
                    name="body"
                    component="input"
                    type="text"
                    placeholder="Enter comment"
                  />
                </div>
                <div>
                  <button type="submit" disabled={pristine || submitting}>
                    Submit
                  </button>
                  <button
                    type="button"
                    disabled={pristine || submitting}
                    onClick={reset}
                  >
                    Clear Values
                  </button>
                </div>
              </div>
            </form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

const validate = () => {
  const errors = {};

  return errors;
};

const mapStateToProps = (state, ownProps) => {
  const comment = _.mapKeys(state.posts[ownProps.postId].comments, 'id')[
    ownProps.commentId
  ];
  return {
    comment,
    initialValues: comment
  };
};

EditCommentModal = reduxForm({
  form: 'editCommentModal', // a unique identifier for this form
  validate // <--- validation function given to redux-form
})(EditCommentModal);

EditCommentModal = connect(
  mapStateToProps,
  { fetchComments, updateComment } // bind account loading action creator
)(EditCommentModal);

export default EditCommentModal;
