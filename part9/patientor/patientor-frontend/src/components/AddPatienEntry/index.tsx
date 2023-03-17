import { useState } from "react";
import { useParams } from "react-router-dom";
import { EntryFormValues, Patient } from "../../types";
import AddHealtcheckForm from "./AddHealtcheckForm";
import patientService from "../../services/patients";
import { Typography, Box } from "@mui/material";
import axios from "axios";

interface Props {
  setPatient: (patient: Patient) => void;
}

const boxStyle = {
  bgcolor: "#ef5350",
  p: 2,
  mb: 2,
  borderRadius: 2,
};

const AddPatientEntry = ({ setPatient }: Props) => {
  const [error, setError] = useState<string>();
  const id = useParams().id;

  const setErrorMessage = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(undefined);
    }, 5000);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    if (id) {
      try {
        const patient = await patientService.addEntry(values, id);
        setPatient(patient);
        setErrorMessage("");
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const message = e.response.data.replace(
              "Something went wrong. Error: ",
              ""
            );
            console.error(message);
            setErrorMessage(message);
          } else {
            setErrorMessage("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", e);
          setErrorMessage("Unknown error");
        }
      }
    } else {
      console.error("Missing patient ID error");
      setErrorMessage("Missing patient ID error");
    }
  };

  return (
    <Box>
      <Typography variant="h6" my={2}>
        Add entry:
      </Typography>
      {error ? (
        <Box sx={boxStyle}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
            {error}
          </Typography>
        </Box>
      ) : null}
      <AddHealtcheckForm onSubmit={submitNewEntry} />
    </Box>
  );
};

export default AddPatientEntry;
