import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../weather/models";
import { RootState } from "../../store/store";
import { getLocationName } from "./api";

export interface CurrentLocationState {
  data: {
    longitude: string | null;
    latitude: string | null;
    locationName: string | null;
  };
  status: Status;
  deniedLocation: boolean;
  error: string | null;
}

const CurrentLocationInitialState: CurrentLocationState = {
  data: {
    longitude: null,
    latitude: null,
    locationName: null,
  },
  status: Status.idle,
  deniedLocation: false,
  error: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState: CurrentLocationInitialState,
  reducers: {
    setLocation: (state, action) => {
      state.data.latitude = action.payload.latitude;
      state.data.longitude = action.payload.longitude;
    },
    setDeclinedLocation: (state, action) => {
      state.deniedLocation = action.payload.deniedLocation;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLocationName.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(getLocationName.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.data = { ...state.data, locationName: action.payload };
      })
      .addCase(getLocationName.rejected, (state, action) => {
        state.status = Status.failed;
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export const { setLocation, setDeclinedLocation } = locationSlice.actions;
export const selectLocation = (state: RootState) =>
  state.rootReducer.locationReducer;

export default locationSlice.reducer;
