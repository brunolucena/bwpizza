export type SnackbarStyle = "success" | "error";

interface OpenSnackbarRequest {
  message: string;
  /** default: error */
  style?: SnackbarStyle;
}

export const OPEN_SNACKBAR = "OPEN_SNACKBAR";
export const SET_SNACKBAR_OPENED = "SET_SNACKBAR_OPENED";

export interface OpenSnackbar {
  type: typeof OPEN_SNACKBAR;
  payload: OpenSnackbarRequest;
}

export interface SetOpened {
  type: typeof SET_SNACKBAR_OPENED;
  payload: { opened: boolean };
}

export type Actions = OpenSnackbar | SetOpened;

export interface State {
  message: string;
  opened: boolean;
  style: SnackbarStyle;
}

const initialState: State = {
  message: "",
  opened: false,
  style: "error",
};

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case OPEN_SNACKBAR: {
      const { message, style } = action.payload;

      return {
        ...state,
        message,
        opened: true,
        style: style || "error",
      };
    }

    case SET_SNACKBAR_OPENED: {
      const { opened } = action.payload;

      return {
        ...state,
        opened,
      };
    }

    default: {
      return state;
    }
  }
}

export function openSnackbar(data: OpenSnackbarRequest): OpenSnackbar {
  return {
    type: OPEN_SNACKBAR,
    payload: data,
  };
}

export function setSnackbarOpened(opened: boolean): SetOpened {
  return {
    type: SET_SNACKBAR_OPENED,
    payload: { opened },
  };
}
