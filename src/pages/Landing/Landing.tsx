import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getAQIByLocation } from "../../state/weather/api";
import {
  selectLocation,
  setDeclinedLocation,
  setLocation,
} from "../../state/location/slice";
import { Loading } from "../../components/Loading/Loading";
import { selectWeatherInfo } from "../../state/weather/slice";
import { WeatherDetails } from "../../components/WeatherDetails/WeatherDetails";
import { getLocationName } from "../../state/location/api";
import { Container, Typography } from "@mui/material";
import "./styles.css";

function Landing() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: locationData } = useSelector(selectLocation);
  const { data: weatherData } = useSelector(selectWeatherInfo);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords;
            dispatch(setLocation({ latitude, longitude }));
          },
          () => {
            dispatch(setDeclinedLocation({ deniedLocation: true }));
          }
        );
      } else {
        dispatch(setDeclinedLocation({ deniedLocation: true }));
      }
    };
    getLocation();
  }, [dispatch]);

  useEffect(() => {
    if (locationData.latitude && locationData.longitude) {
      const { latitude, longitude } = locationData;
      dispatch(getAQIByLocation({ latitude, longitude }));
      dispatch(getLocationName({ latitude, longitude }));
    }
  }, [locationData.latitude, locationData.longitude, dispatch]);

  return (
    <Container>
      {weatherData?.today ? (
        <Container className="main-container">
          <Typography align="center">{locationData.locationName}</Typography>
          <Typography align="center">Lat:{locationData.latitude} Lon:{locationData.longitude}</Typography>
          <div className="weather-container">
            <WeatherDetails
              date="Yesterday"
              measurements={weatherData?.yesterday}
            />
            <WeatherDetails date="Today" measurements={weatherData?.today} />
            <WeatherDetails
              date="Tomorrow"
              measurements={weatherData?.tomorrow}
            />
          </div>
        </Container>
      ) : (
        <Loading />
      )}
    </Container>
  );
}

export default Landing;
