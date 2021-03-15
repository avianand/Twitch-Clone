import React, { useEffect } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { getStream as fetchStream, editStream } from "../../actions/index";
import StreamForm from "./StreamForm";

const EditStream = ({ stream, fetchStream, id, editStream }) => {
  useEffect(() => {
    fetchStream(id);
  }, []);

  const onSubmit = (formValues) => {
    const response = editStream(id, formValues);
  };

  if (!stream) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <StreamForm
        onSubmit={onSubmit}
        initialValues={_.pick(stream, "title", "description")}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return { id: id, stream: state.streams[id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  EditStream
);
