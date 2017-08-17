import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Container, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';
import _ from 'lodash';
import { createPost, fetchCategories, fetchPost } from '../actions';

class createEditForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.props.fetchCategories();
    debugger;
    if (this.props.match.params.id) {
      this.props.fetchPost(this.props.match.params.id);
    }
  }

  submit = values => {
    values.id = uuidv1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'
    values.timestamp = Date.now();
    this.props.createPost(values, () => this.props.history.push('/'));
  };

  renderField = ({ input, label, type, meta: { touched, error }, val }) => {
    return (
      <div>
        {touched && error
          ? <Form.Input
              label={label}
              placeholder={label}
              type={type}
              {...input}
              error
            />
          : <Form.Input
              label={label}
              placeholder={label}
              type={type}
              {...input}
            />}
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
    const { handleSubmit, categories, post } = this.props;
    //todo: is there a better/cleaner way to do this
    if (_.isEmpty(categories)) {
      return <div />;
    } else if (!post) {
      return (
        <Container text style={{ marginTop: '7em' }}>
          <Header as="h1">Create Post</Header>
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
            />
            {/*todo: need to add validation */}
            <div>
              <label>Category</label>
              <div>
                <Field name="category" component="select">
                  <option value="">Select a category</option>
                  {this.renderOptions(categories)}
                </Field>
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <Button type="submit">Submit</Button>

              <Link to="/">
                <Button>Cancel</Button>
              </Link>
            </div>
          </Form>
        </Container>
      );
    } else {
      return (
        <Container text style={{ marginTop: '7em' }}>
          <Header as="h1">Create Post</Header>
          <Form onSubmit={handleSubmit(this.submit)}>
            <Field
              name="title"
              type="text"
              label="Title"
              val={post.title}
              component={this.renderField}
            />
            <Field
              name="body"
              type="text"
              label="Body"
              val={post.body}
              component={this.renderField}
            />
            <Field
              name="author"
              type="text"
              label="Author"
              value={post.author}
              component={this.renderField}
            />
            {/*todo: need to add validation */}
            <div>
              <label>Category</label>
              <div>
                <Field name="category" component="select" value={post.category}>
                  <option value="">Select a category</option>
                  {this.renderOptions(categories)}
                </Field>
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <Button type="submit">Submit</Button>

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
})(
  connect(mapStateToProps, { createPost, fetchCategories, fetchPost })(
    createEditForm
  )
);

export default createEditForm;
