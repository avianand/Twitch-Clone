import React from "react";
import { Field, reduxForm } from "redux-form";

const StreamForm = ({ handleSubmit, onSubmit }) => {
  const renderInput = ({ input, label }) => {
    return (
      <div className="field">
        <div>{label}</div>
        <input {...input} autoComplete="off" />
      </div>
    );
  };
  const renderError = () => {
    return <div>errors</div>;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field name="title" component={renderInput} label="Title" />
      <Field name="description" component={renderInput} label="Description" />
      <br />
      <button type="submit" className="ui primary button">
        Submit
      </button>
    </form>
  );
};

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "You must enter a title";
  }
  if (!values.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

export default reduxForm({ form: "streamForm", validate })(StreamForm);
