import { validateAddress } from "../../Helpers/types";

export const validate = (values: validateAddress):validateAddress => {
    let errors: validateAddress = {};
    if (!values.firstName) {
        errors.firstName = "Enter your first name.";
    }
    else if (!values.lastName) {
        errors.lastName = "Enter your last name.";
    }
    else if (!values.email) {
        errors.email = "Enter your email address.";
    }
    else if (!values.email?.includes("@")) {
        errors.email = "Enter email id in correct format.";
    }
    else if (!values.street) {
        errors.street = "Enter your street name.";
    }
    else if (!values.city) {
        errors.city = "Enter your city name.";
    }
    else if (!values.state) {
        errors.state = "Enter your state name.";
    }
    else if (!values.zipcode) {
        errors.zipcode = "Enter your zipcode.";
    }
    else if(/[A-Z]/.test(values.zipcode) || /[^A-Za-z0-9]/.test(values.zipcode)){
       errors.zipcode = "Zip Code must contains only numbers";
    }
    else if (!values.country) {
        errors.country = "Enter your country name.";
    }
    else if(!values.phone){
       errors.phone = "Enter your phone number";
    }
    else if(/[A-Z]/.test(values.phone) || /[^A-Za-z0-9]/.test(values.phone)){
       errors.phone = "phone number must contains only numbers";
    }
    return errors;
}