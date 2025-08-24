import { validateLogin } from "../../../Helpers/types";

export const validate = (values: validateLogin): validateLogin => {
    const errors: validateLogin = {};
    if (!values.email) {
        errors.email = "Your email id is required.";;
    }
    else if (!values.email?.includes('@')) {
        errors.email = "Enter email id in correct format."
    }
    else if (!values.password) {
        errors.password = "Password is required.";
    }
    return errors;
}