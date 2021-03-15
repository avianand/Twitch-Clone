import React, { useEffect } from "react";
import Modal from "../Modal";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteStream, getStream as fetchStream } from "../../actions/index";
import history from "../../history";

const StreamDelete = ({ id, deleteStream, fetchStream, stream }) => {
  useEffect(() => {
    fetchStream(id);
  }, []);

  const renderActions = () => {
    return (
      <div>
        <button
          onClick={() => {
            deleteStream(id);
          }}
          className="ui negative button"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </div>
    );
  };

  const renderContent = () => {
    if (!stream) {
      return "Are you sure you want to delete this stream?";
    }
    return `Are you sure you want to delete the stream with title: ${stream.title} ?`;
  };

  if (!stream) {
    return <div> Loading ...</div>;
  }

  return (
    <div>
      Delete Stream
      <Modal
        title="Delete stream"
        content={renderContent()}
        actions={renderActions()}
        onDismiss={() => history.push("/")}
        stream={stream}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.match.params.id,
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { deleteStream, fetchStream })(
  StreamDelete
);
