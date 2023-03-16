import { v1 as uuid } from "uuid";
import patients from "../data/patientsData";

import {
  Patient,
  NonSensitivePatient,
  NewPatientEntry,
  NewHealthEntry,
} from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getSinglePatient = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    entries: [],
    ...patient,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addHealthEntry = (entry: NewHealthEntry, id: string): Patient => {
  const newHealthEntry = {
    id: uuid(),
    ...entry,
  };
  const patientIndex = patients.findIndex((p) => p.id === id);
  patients[patientIndex].entries.push(newHealthEntry);
  return patients[patientIndex];
};

export default {
  getPatients,
  getSinglePatient,
  getNonSensitivePatients,
  addPatient,
  addHealthEntry,
};
