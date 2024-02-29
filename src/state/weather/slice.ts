import { createSlice } from "@reduxjs/toolkit";
import { getAQIByLocation } from "./api";
import { GetAQIByLocationResponse, Status } from "./models";
import { RootState } from "../../store/store";

export interface WeatherInfoState {
  data: GetAQIByLocationResponse | null;
  status: Status;
  error: string | null;
}

const WeatherInfoInitialState: WeatherInfoState = {
  data: null,
  status: Status.idle,
  error: null,
};

const weatherSlice = createSlice({
  name: "yourFeature",
  initialState: WeatherInfoInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAQIByLocation.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(getAQIByLocation.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.data = action.payload;
      })
      .addCase(getAQIByLocation.rejected, (state, action) => {
        state.status = Status.failed;
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export const selectWeatherInfo = (state: RootState) =>
  state.rootReducer.weatherReducer;

export default weatherSlice.reducer;
