import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
} from "./types";
import stream from "../apis/streams";
import history from "../history";

export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await stream.post("/streams", {
    ...formValues,
    userId,
  });
  dispatch({ type: CREATE_STREAM, payload: response.data });
  history.push("/");
};

export const editStream = (id, formValues) => async (dispatch, getState) => {
  console.log("edit stream called");
  const response = await stream.patch(`/streams/${id}`, formValues);
  console.log(response);
  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push("/");
};

export const deleteStream = (id) => async (dispatch, getState) => {
  const response = await stream.delete(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
  history.push("/");
};

export const getStream = (id) => async (dispatch, getState) => {
  const response = await stream.get(`/streams/${id}`);
  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const getStreams = () => async (dispatch, getState) => {
  const response = await stream.get("/streams");

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = (id) => {
  return {
    type: SIGN_OUT,
  };
};
