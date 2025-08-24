import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SellerStore } from "../../../store/seller_dashboard/SellerStore.ts";
import { ThemeStore } from "../../../store/main_app/ThemeStore.ts";
import { useFormik } from "formik";
import { validate } from "./validateLogin.ts";
import { validLogin, SellerStates, themeStore } from "../../../Helpers/types.ts";
import { Input,InputPassword } from "../../../components/Input.tsx";
import { X,Mail,Lock } from "lucide-react";
import {motion} from "motion/react";

const SellerLogin = () => {
    const [showPassword, setshowPassword] = useState(false);
    const navigate = useNavigate();
    const { theme } = ThemeStore() as themeStore;
    const { Login } = SellerStore() as SellerStates;
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate,
        onSubmit: (values:validLogin) => {
            Login(values);
        },
    });
    
  return (
    <div className='sellerlogin_page'>
            <motion.form initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:0.7}} onSubmit={formik.handleSubmit} className='sellerlogin_form'>
                <h1 className='seller_form_heading '>Seller Login</h1>
                <div className='flex flex-col gap-6 mt-2'>
                    {/* Email */}
                    <Input label={"Email"} type={"email"} name={'email'} onChange={formik.handleChange} value={formik.values.email} id={'email'} placeholder={"Enter your email"} errors={formik.errors.email} Icon={Mail} className="sellerform_input"/>

                    {/* password */}
                    <InputPassword label={"Password"} name={'password'} onChange={formik.handleChange} value={formik.values.password} id={'password'} placeholder={"Enter your password"} errors={formik.errors.password} Icon={Lock} setShowPassword={setshowPassword} showPassword={showPassword} className="sellerform_input"/>

                    <button type="submit" className={`submit_btn ${theme == "dark" ? "text-black" : "text-white"}`}>Login</button>

                </div>
                <X className="page_closing_btn" onClick={() => navigate("/")} />
            </motion.form>
        </div>
  )
}

export default SellerLogin