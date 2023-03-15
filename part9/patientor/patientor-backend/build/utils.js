"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewHealthEntry = exports.toNewPatientEntry = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const parseStringField = (element, field) => {
    if (!isString(element)) {
        throw new Error(`Incorrect or missing ${field}`);
    }
    return element;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date: " + date);
    }
    return date;
};
const isGender = (param) => {
    return Object.values(types_1.Gender)
        .map((v) => v.toString())
        .includes(param);
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect or missing gender:" + gender);
    }
    return gender;
};
const parseHealthRating = (rating) => {
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
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("name" in object &&
        "dateOfBirth" in object &&
        "ssn" in object &&
        "gender" in object &&
        "occupation" in object) {
        const newPatient = {
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
exports.toNewPatientEntry = toNewPatientEntry;
const toNewHealthEntry = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("description" in object &&
        "date" in object &&
        "specialist" in object &&
        "type" in object) {
        switch (object.type) {
            case "HealthCheck":
                if ("healthCheckRating" in object) {
                    const newHealthEntry = {
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
                const newHealthEntry = {
                    type: "Hospital",
                    description: parseStringField(object.description, "description"),
                    date: parseDate(object.date),
                    specialist: parseStringField(object.specialist, "specialist"),
                };
                if ("discharge" in object &&
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    "date" in object.discharge &&
                    "criteria" in object.discharge) {
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
exports.toNewHealthEntry = toNewHealthEntry;
