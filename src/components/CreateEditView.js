import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Container, Header, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';
import _ from 'lodash';
import { createPost, fetchCategories } from '../actions';

class createEditForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  submit = values => {
    values.id = uuidv1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'
    values.timestamp = Date.now();
    this.props.createPost(values, () => this.props.history.push('/'));
  };

  renderField = ({ input, label, type, meta: { touched, error } }) => {
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

  // renderDropdown = ({ input, label, meta: { touched, error }, categories }) => {
  //   const option = categories.map(category => {
  //     return { key: category, text: category, value: category };
  //   });
  //   return <Dropdown placeholder={label} fluid selection options={option} />;
  // };

  renderOptions = categories => {
    return categories.map(category =>
      <option key={category} value={category}>
        {category}
      </option>
    );
  };

  render() {
    const { handleSubmit, categories } = this.props;
    //todo: is there a better/cleaner way to do this
    if (_.isEmpty(categories)) {
      return <div />;
    } else {
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
            {/*<Field
              name="category"
              label="Select a catergory"
              component={this.renderDropdown}
              categories={categories}
            />*/}
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

const mapStateToProps = ({ categories }) => {
  return {
    categories
  };
};

export default reduxForm({
  form: 'createEditForm', // a unique identifier for this form
  validate // <--- validation function given to redux-form
})(connect(mapStateToProps, { createPost, fetchCategories })(createEditForm));
