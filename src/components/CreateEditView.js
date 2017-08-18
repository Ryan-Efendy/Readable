import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Container, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';
import _ from 'lodash';
import { createPost, fetchCategories, fetchPost, updatePost } from '../actions';

class createEditForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
      isEditView: false
    };
  }

  componentDidMount() {
    this.props.fetchCategories();
    if (this.props.match.params.id) {
      this.setState({ isEditView: true });
      this.props.fetchPost(this.props.match.params.id);
    }
  }

  submit = values => {
    const { createPost, updatePost, match: { params: { id } } } = this.props;
    if (this.state.isEditView) {
      let updateValues = {};
      updateValues.title = values.title;
      updateValues.body = values.body;
      updatePost(id, updateValues, () => this.props.history.push('/'));
    } else {
      values.id = uuidv1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'
      values.timestamp = Date.now();
      createPost(values, () => this.props.history.push('/'));
    }
  };

  renderField = ({
    input,
    label,
    type,
    meta: { touched, error },
    val,
    disabled
  }) => {
    let userMessage;
    if (disabled) {
      userMessage = (
        <Form.Input
          label={label}
          placeholder={label}
          type={type}
          {...input}
          error
          disabled
        />
      );
    } else if (touched && error) {
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

  renderOptions = categories => {
    return categories.map(category =>
      <option key={category} value={category}>
        {category}
      </option>
    );
  };

  render() {
    const { handleSubmit, categories } = this.props;
    const { isEditView } = this.state;
    //todo: is there a better/cleaner way to do this
    if (_.isEmpty(categories)) {
      return <div />;
    } else {
      return (
        <Container text style={{ marginTop: '7em' }}>
          <Header as="h1">
            {isEditView ? `Edit Post` : `Create Post`}
          </Header>
          <Form onSubmit={handleSubmit(this.submit)}>
            <Field
              name="title"
              type="text"
              label="Title"
              component={this.renderField}
            />
            <Field
              name="body"
              type="text"
              label="Body"
              component={this.renderField}
            />
            <Field
              name="author"
              type="text"
              label="Author"
              component={this.renderField}
              disabled={isEditView ? true : false}
            />
            {/*todo: need to add validation */}
            <div>
              <label>Category</label>
              <div>
                <Field
                  name="category"
                  component="select"
                  disabled={isEditView ? true : false}
                >
                  <option value="">Select a category</option>
                  {this.renderOptions(categories)}
                </Field>
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <Button type="submit">
                {isEditView ? `Update` : `Submit`}
              </Button>
              <Link to="/">
                <Button>Cancel</Button>
              </Link>
            </div>
          </Form>
        </Container>
      );
    }
  }
}

const validate = values => {
  const errors = {};
  // validate the input from 'values'
  if (!values.title) {
    errors.title = 'Enter a title';
  }
  if (!values.body) {
    errors.body = 'Enter a body';
  }
  if (!values.author) {
    errors.author = 'Enter a author';
  }
  if (!values.category) {
    errors.category = 'Select a category';
  }
  // if errors is empty, the form is fine to submit
  // else the errors has properties, redux form assumes form is invalid
  return errors;
};

const mapStateToProps = ({ posts, categories }, ownProps) => {
  return {
    post: posts[ownProps.match.params.id],
    categories,
    initialValues: posts[ownProps.match.params.id]
  };
};

createEditForm = reduxForm({
  form: 'createEditForm', // a unique identifier for this form
  validate // <--- validation function given to redux-form
})(createEditForm);

createEditForm = connect(
  mapStateToProps,
  { createPost, fetchCategories, fetchPost, updatePost } // bind account loading action creator
)(createEditForm);

export default createEditForm;
