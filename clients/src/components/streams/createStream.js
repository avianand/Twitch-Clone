import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createStream } from "../../actions/index";
import StreamForm from "./StreamForm";

const StreamCreate = ({ createStream }) => {
  const onSubmit = (formValues) => {
    console.log(formValues);
    const response = createStream(formValues);
  };

  return (
    <div>
      <h3>Create a stream</h3>
      <StreamForm onSubmit={onSubmit} />
    </div>
  );
};

export default connect(null, { createStream })(StreamCreate);
