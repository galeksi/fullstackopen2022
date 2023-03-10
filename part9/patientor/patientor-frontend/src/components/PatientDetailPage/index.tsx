import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";
import patientService from "../../services/patients";

import { Box, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import EntryDetails from "./EntryDetails";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientDetailPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient>();
  const id = useParams().id;

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const fetchedPatient = await patientService.getSingle(id);
        setPatient(fetchedPatient);
      }
    };

    fetchPatient();
  }, [id]);

  return (
    <Box>
      <Typography variant="h4" my={4}>
        {patient?.name}{" "}
        {patient?.gender === "male" ? <MaleIcon fontSize="large" /> : null}
        {patient?.gender === "female" ? <FemaleIcon fontSize="large" /> : null}
      </Typography>
      <Typography variant="body1">
        Date of birth: {patient?.dateOfBirth}
        <br />
        SSN: {patient?.ssn}
        <br />
        Occupation: {patient?.occupation}
      </Typography>
      <Typography variant="h6" my={2}>
        Entries:
      </Typography>
      {patient?.entries.map((e) => (
        <EntryDetails key={e.id} entry={e} diagnoses={diagnoses} />
      ))}
    </Box>
  );
};

export default PatientDetailPage;
