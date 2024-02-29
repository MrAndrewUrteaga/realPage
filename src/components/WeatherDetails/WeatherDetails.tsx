import { LocationResponse } from "../../state/weather/models";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { mesurementTransform } from "../../utils/mesurementTransform";
import Typography from "@mui/material/Typography";

interface Props {
  date: string;
  measurements: LocationResponse;
}

export const WeatherDetails = ({ date, measurements }: Props) => {
  const mesurementData = mesurementTransform(measurements.components);
  return <BasicTable title={date} data={mesurementData} />;
};

interface TabelProps {
  data: RowItem[];
  title: string;
}

interface RowItem {
  rowName: string;
  rowValue: number;
}

export const BasicTable = ({ data, title }: TabelProps) => {
  return (
    <div className="table-container">
      <TableContainer component={Paper}>
        <Typography align="center">{title}</Typography>
        <Table sx={{ minWidth: 100 }}>
          <TableHead>
            <TableRow>
              <TableCell>Measurement</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.rowName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.rowName}
                </TableCell>
                <TableCell align="right">{row.rowValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
