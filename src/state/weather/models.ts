export interface Coordinates {
  longitude: string;
  latitude: string;
}

export enum Status {
  idle = "idle",
  loading = "loading",
  succeeded = "succeeded",
  failed = "failed",
}

export interface GetAQIByLocationResponse {
  yesterday: LocationResponse;
  today: LocationResponse;
  tomorrow: LocationResponse;
}

export interface LocationResponse {
  dt: number;
  main: {
    aqi: number;
  };
  components: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
}
