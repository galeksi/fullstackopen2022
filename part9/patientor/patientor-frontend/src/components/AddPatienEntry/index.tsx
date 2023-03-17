import { useState } from "react";
import { useParams } from "react-router-dom";
import { EntryFormValues, Patient } from "../../types";
import AddHealtcheckForm from "./AddHealtcheckForm";
import patientService from "../../services/patients";
import {
  Typography,
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import AddHospitalForm from "./AddHospitalForm";
import AddOccupationalHealthForm from "./AddOccupationalHealthForm";

interface Props {
  setPatient: (patient: Patient) => void;
}

const boxStyle = {
  bgcolor: "#ffcdd2",
  p: 2,
  mb: 2,
  borderRadius: 2,
};

const AddPatientEntry = ({ setPatient }: Props) => {
  const [error, setError] = useState<string>();
  const [entryType, setEntryType] = useState("");
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

  const handleChange = (event: SelectChangeEvent) => {
    setEntryType(event.target.value as string);
  };

  return (
    <Box>
      <Typography variant="h6" my={2}>
        Add entry:
        <FormControl fullWidth>
          <InputLabel id="simple-name-label">Type</InputLabel>
          <Select
            labelId="simple-name-label"
            id="simple-name"
            value={entryType}
            label="Type"
            onChange={handleChange}
          >
            <MenuItem value={"Health check"}>Health check</MenuItem>
            <MenuItem value={"Hospital"}>Hospital</MenuItem>
            <MenuItem value={"Occupational healthcare"}>
              Occupational healthcare
            </MenuItem>
          </Select>
        </FormControl>
      </Typography>
      {error ? (
        <Box sx={boxStyle}>
          <Typography variant="h6" sx={{ color: "#c62828" }}>
            {error}
          </Typography>
        </Box>
      ) : null}
      {entryType === "Health check" && (
        <AddHealtcheckForm onSubmit={submitNewEntry} />
      )}
      {entryType === "Hospital" && (
        <AddHospitalForm onSubmit={submitNewEntry} />
      )}
      {entryType === "Occupational healthcare" && (
        <AddOccupationalHealthForm onSubmit={submitNewEntry} />
      )}
    </Box>
  );
};

export default AddPatientEntry;
