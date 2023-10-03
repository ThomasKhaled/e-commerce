import * as Yup from "yup";

// Create a function that generates a validation schema for a specific field and condition
const createValidationSchema = (
  fieldName,
  validationFunction,
  errorMessage
) => {
  return Yup.object().shape({
    [fieldName]: Yup.string().test(fieldName, errorMessage, validationFunction),
  });
};

// Example usage for different fields and conditions
export const validationSchemas = {
  userName: createValidationSchema(
    "userName",
    (value) => typeof value === "string" && value.trim() !== "",
    "Username is required"
  ),
  phoneNumber: createValidationSchema(
    "phoneNumber",
    (value) => /^\d{11}$/.test(value),
    "Phone number is invalid"
  ),
  email: createValidationSchema(
    "email",
    (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
    "Invalid email format"
  ),
  password: createValidationSchema(
    "password",
    (value) => typeof value === "string" && value.length >= 6,
    "Password must be at least 6 characters"
  ),
  confirmPassword: createValidationSchema(
    "confirmPassword",
    (value, context) => value === context.parent.password,
    "Passwords must match"
  ),
};

export function mergedSchemas(...schemas) {
  const [first, ...rest] = schemas;

  const merged = rest.reduce(
    (mergedSchemas, schema) => mergedSchemas.concat(schema),
    first
  );

  return merged;
}
