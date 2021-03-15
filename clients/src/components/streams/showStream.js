import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import flv from "flv.js";
import { getStream as fetchStream } from "../../actions";

const ShowStream = ({ stream, id, fetchStream }) => {
  const videoRef = useRef(null);
  let player = null;
  useEffect(() => {
    fetchStream(id);
    buildPlayer();
    return () => {
      player.destroy();
    };
  }, []);

  const buildPlayer = () => {
    if (player || !stream) {
      return;
    }
    console.log(id);
    player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    player.attachMediaElement(videoRef.current);
    player.load();
  };

  if (!stream) {
    return <div>Loading...</div>;
  }
  return (
    <div className="content">
      <video ref={videoRef} style={{ width: "100%" }} controls />
      <div className="header">{stream.title}</div>
      <div className="description">{stream.description}</div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.match.params.id,
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream })(ShowStream);
