import Validator from "validator";
import isEmpty from "./is-empty.js";

export const validateLoginInput = (data) => {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (data.username) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.username)) {
    errors.email = "Username field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
