import { Entry, Diagnosis } from "../../types";

import { Typography, Box } from "@mui/material";

import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const boxStyle = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  p: 2,
  mb: 2,
  border: 1,
  borderRadius: 2,
};

const EntryDetails = ({ entry, diagnoses }: Props) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Box sx={boxStyle}>
          <Typography>
            {entry.date}
            {"  "}
            <MedicalInformationOutlinedIcon />
          </Typography>
          <Typography>{entry.description}</Typography>
          {entry.discharge ? (
            <Typography>
              Discharge: {entry.discharge.date} - {entry.discharge.criteria}
            </Typography>
          ) : null}
          <Typography mt={2}>Diagnose by: {entry.specialist}</Typography>
          <ul>
            {entry.diagnosisCodes?.map((d) => (
              <li key={d}>
                <Typography variant="body2">
                  {d} {diagnoses.find((e) => e.code === d)?.name}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
      );
    case "HealthCheck":
      return (
        <Box sx={boxStyle}>
          <Typography>
            {entry.date}
            {"  "}
            <InventoryOutlinedIcon />
          </Typography>
          <Typography>{entry.description}</Typography>
          {[...Array(entry.healthCheckRating + 1)].map(
            (value: undefined, index: number) => (
              <FavoriteBorderIcon key={index} />
            )
          )}
          <Typography mt={2}>Diagnose by: {entry.specialist}</Typography>
          <ul>
            {entry.diagnosisCodes?.map((d) => (
              <li key={d}>
                <Typography variant="body2">
                  {d} {diagnoses.find((e) => e.code === d)?.name}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
      );
    case "OccupationalHealthcare":
      return (
        <Box sx={boxStyle}>
          <Typography>
            {entry.date}
            {"  "}
            <MedicalServicesOutlinedIcon />
            {"  "}
            {entry.employerName}
          </Typography>
          <Typography>{entry.description}</Typography>
          {entry.sickLeave ? (
            <Typography>
              Sickleave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
            </Typography>
          ) : null}
          <Typography mt={2}>Diagnose by: {entry.specialist}</Typography>
          <ul>
            {entry.diagnosisCodes?.map((d) => (
              <li key={d}>
                <Typography variant="body2">
                  {d} {diagnoses.find((e) => e.code === d)?.name}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
