import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GetAQIByLocationResponse } from "./models";

export const getAQIByLocation = createAsyncThunk<
  GetAQIByLocationResponse,
  { longitude: string; latitude: string }
>("weatherSlice/fetchData", async ({ longitude, latitude }) => {
  const yesterday: Date = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const today: Date = new Date();

  const tomorrow: Date = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  try {
    const yesterdayData = await fetchWeatherData(
      yesterday,
      longitude,
      latitude
    );
    const todayData = await fetchWeatherData(today, longitude, latitude);
    const tomorrowData = await fetchWeatherData(tomorrow, longitude, latitude);

    return {
      yesterday: yesterdayData.list[0],
      today: todayData.list[0],
      tomorrow: tomorrowData.list[0],
    };
  } catch (error) {
    throw "Error getting info";
  }
});

const fetchWeatherData = async (date: Date, lon: string, lat: string) => {
  const start: Date = new Date(date);
  start.setUTCHours(0, 0, 0, 0);

  const end: Date = new Date(date);
  end.setUTCHours(23, 59, 59, 999);

  const parameters = {
    lat,
    lon,
    start: Math.floor(start.getTime() / 1000),
    end: Math.floor(end.getTime() / 1000),
    appid: process.env.REACT_APP_API_KEY,
  };
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_WEATHER_API}/data/2.5/air_pollution/history`,
      {
        params: {
          ...parameters,
        },
      }
    );
    return data;
  } catch (error) {
    throw "Error getting info";
  }
};
