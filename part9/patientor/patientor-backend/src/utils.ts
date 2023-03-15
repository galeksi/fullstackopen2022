import {
  NewPatientEntry,
  Gender,
  NewHealthEntry,
  HealthCheckRating,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseStringField = (element: unknown, field: string): string => {
  if (!isString(element)) {
    throw new Error(`Incorrect or missing ${field}`);
  }

  return element;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender:" + gender);
  }
  return gender;
};

const parseHealthRating = (rating: unknown): HealthCheckRating => {
  if (Number.isNaN(Number(rating)) || ![0, 1, 2, 3].includes(Number(rating))) {
    throw new Error("Incorrect or missing health rating:" + rating);
  }
  return Number(rating);
};

// const parseHospitalDischarde = (element: unknown): object => {
//   const discharge: object = {
//     date: element.
//   }
// }

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatientEntry = {
      name: parseStringField(object.name, "name"),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseStringField(object.ssn, "ssn"),
      gender: parseGender(object.gender),
      occupation: parseStringField(object.occupation, "occupation"),
    };
    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export const toNewHealthEntry = (object: unknown): NewHealthEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    switch (object.type) {
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          const newHealthEntry: NewHealthEntry = {
            type: "HealthCheck",
            description: parseStringField(object.description, "description"),
            date: parseDate(object.date),
            specialist: parseStringField(object.specialist, "specialist"),
            healthCheckRating: parseHealthRating(object.healthCheckRating),
          };
          return newHealthEntry;
        }
        throw new Error("Incorrect data: some fields are missing");

      case "Hospital":
        const newHealthEntry: NewHealthEntry = {
          type: "Hospital",
          description: parseStringField(object.description, "description"),
          date: parseDate(object.date),
          specialist: parseStringField(object.specialist, "specialist"),
        };
        if (
          "discharge" in object &&
          "date" in object.discharge &&
          "criteria" in object.discharge
        ) {
          newHealthEntry.discharge = {
            date: parseDate(object.discharge.date),
            criteria: parseStringField(object.discharge.criteria, "criteria"),
          };
          return newHealthEntry;
        }
        return newHealthEntry;
      default:
        throw new Error("Incorrect data: correct union member missing");
    }
  }

  throw new Error("Incorrect data: some fields are missing");
};
