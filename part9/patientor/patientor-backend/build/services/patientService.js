"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patientsData_1 = __importDefault(require("../data/patientsData"));
const getPatients = () => {
    return patientsData_1.default;
};
const getSinglePatient = (id) => {
    const patient = patientsData_1.default.find((p) => p.id === id);
    return patient;
};
const getNonSensitivePatients = () => {
    return patientsData_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatient = (patient) => {
    const newPatientEntry = Object.assign({ id: (0, uuid_1.v1)(), entries: [] }, patient);
    patientsData_1.default.push(newPatientEntry);
    return newPatientEntry;
};
exports.default = {
    getPatients,
    getSinglePatient,
    getNonSensitivePatients,
    addPatient,
};
