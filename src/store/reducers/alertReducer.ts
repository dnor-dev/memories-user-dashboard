import Action, { actionTypes } from "../actions/types";

enum statusTypes {
  info = "info",
  error = "error",
  warning = "warning",
  success = "success",
}

type alertState = {
  title: string;
  description?: string;
  status: "info" | "warning" | "success" | "error";
};

const initialState = {
  title: "",
  description: "",
  status: "info" as statusTypes.info,
};

const alertReducer = (
  state: alertState = initialState,
  action: Action,
): alertState => {
  switch (action.type) {
    case actionTypes.ALERT:
      return {
        title: action.payload.title,
        description: action.payload.description,
        status: action.payload.status,
      };

    default:
      return state;
  }
};

export default alertReducer;
