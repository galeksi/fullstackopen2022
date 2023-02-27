import diagnoses from "../data/diagnosesData";

import { Diagnose } from "../types";

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
