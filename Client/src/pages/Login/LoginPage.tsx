import { useFormik } from 'formik';
import {  Mail, Lock, X} from "lucide-react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppStore } from '../../store/main_app/AppStore.ts';
import { ThemeStore } from '../../store/main_app/ThemeStore.ts';
import { themeStore, validLogin } from '../../Helpers/types.ts';
import { motion } from "motion/react";
import { validate } from './validateLogin.ts';
import  {Input, InputPassword } from '../../components/Input.tsx';
import FormLink from '../../components/formLink.tsx';

const LoginPage = () => {
    const [showPassword, setshowPassword] = useState(false);
    const navigate = useNavigate();
    const { theme } = ThemeStore() as themeStore;
    const { Login } = AppStore();
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
        <div className='registration_page'>
            <motion.form initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:0.7}} onSubmit={formik.handleSubmit} className='registration_form'>
                <h1 className='registration_form_heading'>Welcome Back</h1>
                <div className='flex flex-col gap-6 mt-2'>
                    {/* Email */}
                    <Input label={"Email"} type={"email"} name={'email'} onChange={formik.handleChange} value={formik.values.email} id={'email'} placeholder={"Enter your email"} errors={formik.errors.email} Icon={Mail} className="form_input"/>

                    {/* password */}
                    <InputPassword label={"Password"} name={'password'} onChange={formik.handleChange} value={formik.values.password} id={'password'} placeholder={"Enter your password"} errors={formik.errors.password} Icon={Lock} setShowPassword={setshowPassword} showPassword={showPassword} className="form_input"/>

                    <button className={`submit_btn ${theme == "dark" ? "text-black" : "text-white"}`}>Login</button>

                </div>
                <X className="page_closing_btn" onClick={() => navigate("/")} />

                 <FormLink text='Dont have an account yet?' navigateTo='/signup' type='Signup' />
            </motion.form>
        </div>
  )
}

export default LoginPage