import { Entry, Diagnosis } from "../../types";

import { Typography } from "@mui/material";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const HospitalEntry = ({ entry }: Props) => (
  <Typography>{entry.type}</Typography>
);

const EntryDetails = ({ entry, diagnoses }: Props) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <Typography>HealthCheck</Typography>;
    case "OccupationalHealthcare":
      return <Typography>OccupationalHealthcare</Typography>;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
