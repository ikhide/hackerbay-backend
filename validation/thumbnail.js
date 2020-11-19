import Validator from "validator";
import isEmpty from "./is-empty.js";

export const validateThumbnailInput = (data) => {
  const errors = {};

  data.url = !isEmpty(data.url) ? data.url : "";

  const imageRegex = /\.(jpeg|jpg|gif|png)$/;
  if (imageRegex.test(data.url) === false) {
    errors.url = "Invalid image type";
  }

  if (!Validator.isURL(data.url)) {
    errors.url = "Enter a valid URL";
  }

  if (Validator.isEmpty(data.url)) {
    errors.url = "Image url is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
