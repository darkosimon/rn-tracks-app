import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ERROR":
      return { ...state, errorMessage: action.payload };
    case "SIGN_IN":
      return { token: action.payload, errorMessage: "" };
    case "CLEAR_ERROR_MSG":
      return { ...state, errorMessage: "" };
    case "SIGN_OUT":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignIn = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "SIGN_IN", payload: token });
    navigate("TrackList");
  } else {
    navigate("SignUp");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({
    type: "CLEAR_ERROR_MSG",
  });
};

const signup =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "SIGN_IN", payload: response.data.token });
      navigate("TrackList");
    } catch (err) {
      dispatch({ type: "ADD_ERROR", payload: "Something went wrong with sign up" });
    }
  };

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "SIGN_IN", payload: response.data.token });
      navigate("TrackList");
    } catch (err) {
      dispatch({ type: "ADD_ERROR", payload: "Something went wrong with sign in" });
    }
  };

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "SIGN_OUT" });
  navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signup,
    signin,
    signout,
    clearErrorMessage,
    tryLocalSignIn,
  },
  { token: null, errorMessage: "" }
);
