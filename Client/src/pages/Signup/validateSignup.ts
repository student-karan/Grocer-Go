import { validateSignup } from "../../Helpers/types.ts";

export const validate = (values:validateSignup):validateSignup => {
   const errors: validateSignup = {};
   if(!values.username){
      errors.username = "User name is required.";
   }
   else if(!values.email){
      errors.email = "Your email id is required.";;
   }
   else if(!values.email?.includes('@')){
      errors.email = "Enter email id in correct format."
   }
   else if(!values.password){
      errors.password = "Password is required.";
   }
   else if(!/[0-9]/.test(values.password)){
      errors.password = "Password must contain atleast 1 number.";
   }
   else if(!/[A-Z]/.test(values.password)){
      errors.password = "Password must contain atleast 1 uppercase letter.";
   }
   else if(!/[^A-Za-z0-9]/.test(values.password)){
      errors.password = "Password must contain atleast 1 special characters.";
   }
   else if(values.password.length < 8){
     errors.password = "Password length must be atleast 8 characters.";
   }
   return errors;
}