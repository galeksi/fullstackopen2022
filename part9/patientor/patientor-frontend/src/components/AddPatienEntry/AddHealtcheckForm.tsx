import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { EntryFormValues } from "../../types";

const boxStyle = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  p: 2,
  pb: 8,
  mb: 2,
  border: 2,
};

interface Props {
  onSubmit: (values: EntryFormValues) => void;
}

const AddHealtcheckForm = ({ onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthRating, setHealthRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating: Number(healthRating),
      diagnosisCodes: diagnosisCodes.split(","),
    });
    onClear();
  };

  const onClear = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthRating("");
    setDiagnosisCodes("");
  };

  return (
    <Box sx={boxStyle}>
      <Typography my={1}>Healthcheck:</Typography>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Health check rating"
          fullWidth
          value={healthRating}
          onChange={({ target }) => setHealthRating(target.value)}
        />
        <TextField
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
          sx={{ mb: 2 }}
        />
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onClear}
            >
              Clear
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddHealtcheckForm;
