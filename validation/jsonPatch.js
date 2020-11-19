import Validator from "validator";
import isEmpty from "./is-empty.js";

export const validateJsonInput = (data) => {
  const errors = {};

  data.baseJson = !isEmpty(data.baseJson) ? data.baseJson : "";
  data.jsonPatchObject = !isEmpty(data.jsonPatchObject)
    ? data.jsonPatchObject
    : "";

  if (typeof data.baseJson !== "object") {
    errors.baseJson = "BaseJson must be an object";
  }
  if (!data.baseJson) {
    errors.baseJson = "BaseJson is required";
  }

  if (!Array.isArray(data.jsonPatchObject)) {
    errors.jsonPatchObject = "jsonPatchObject must be an array";
  }
  if (!data.jsonPatchObject) {
    errors.jsonPatchObject = "jsonPatchObject field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
