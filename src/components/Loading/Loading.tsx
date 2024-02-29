import CircularProgress from "@mui/material/CircularProgress";
import "./styles.css";

export const Loading = () => {
  return (
    <div className="container">
      <CircularProgress />
      <span className="textContainer">
        Please accept or decline location permissions
      </span>
    </div>
  );
};
