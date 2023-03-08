import { v1 as uuid } from "uuid";
import patients from "../data/patientsData";

import { Patient, NonSensitivePatient, NewPatientEntry } from "../types";

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

export default {
  getPatients,
  getSinglePatient,
  getNonSensitivePatients,
  addPatient,
};
