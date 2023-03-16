/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientService from "../services/patientService";
import { toNewHealthEntry, toNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  // const id = req.params.id;
  const patient = patientService.getSinglePatient(req.params.id);
  if (!patient) {
    res.status(400).send("Error: Patient not found");
  }
  res.json(patient);
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Error";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newHealthEntry = toNewHealthEntry(req.body);
    const updatedPatient = patientService.addHealthEntry(
      newHealthEntry,
      req.params.id
    );
    res.json(updatedPatient);
  } catch (error: unknown) {
    let errorMessage = "Error";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
