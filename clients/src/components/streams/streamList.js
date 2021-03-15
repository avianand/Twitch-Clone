import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getStreams as fetchStreams } from "../../actions";

const StreamList = ({ fetchStreams, streams, currentUserId, isSignedIn }) => {
  useEffect(() => {
    fetchStreams();
  }, []);

  const renderAdmin = (stream) => {
    if (stream) {
      if (currentUserId === stream.userId) {
        return (
          <div className="right floated content">
            <Link
              to={`/streams/edit/${stream.id}`}
              className="ui primary button"
            >
              Edit
            </Link>
            <Link
              to={`/streams/delete/${stream.id}`}
              className="ui secondary button"
            >
              Delete
            </Link>
          </div>
        );
      }
    }
  };

  const renderCreateButton = () => {
    if (isSignedIn) {
      return (
        <div>
          <Link to="/streams/new">
            <button className="ui primary button">Create Stream </button>
          </Link>
        </div>
      );
    }
  };

  const renderStreams = () => {
    return streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {renderAdmin(stream)}
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">Desc: {stream.description} </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <h2>Streams</h2>
      {console.log("rec")}
      <div className="ui celled list">{renderStreams()}</div>
      <div className="right floated content">{renderCreateButton()}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserId: state.auth.userId,
    streams: Object.values(state.streams),
    isSignedIn: state.auth.isSignedIn,
  };
};
export default connect(mapStateToProps, { fetchStreams })(StreamList);
