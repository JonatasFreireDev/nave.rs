import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidadtionErrors(err: ValidationError): Errors {
  const ValidationErrors: Errors = {};

  err.inner.forEach(error => {
    // @ts-ignore: Unreachable code error
    ValidationErrors[error.path] = error.message;
  });

  return ValidationErrors;
}
