import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getLocationName = createAsyncThunk<
  string,
  { longitude: string; latitude: string }
>("locationSlice/fetchLocationName", async ({ longitude, latitude }) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_WEATHER_API}/geo/1.0/reverse`,
      {
        params: {
          lat: latitude,
          lon: longitude,
          appid: process.env.REACT_APP_API_KEY,
        },
      }
    );
    return data[0].name;
  } catch (error) {
    throw "Error getting info";
  }
});
