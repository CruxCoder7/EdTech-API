import Validator from "validatorjs";

export async function validator(
  body: object,
  rules: Validator.Rules,
  customMessages: Validator.ErrorMessages,
  callback: (errors: object | null, passes: boolean) => void
) {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
}
