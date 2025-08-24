import { useFormik } from 'formik';
import { User, Mail, Lock, X} from "lucide-react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeStore } from '../../store/main_app/ThemeStore.ts';
import { AppStates, themeStore, validSignup } from '../../Helpers/types.ts';
import { motion } from "motion/react";
import { validate } from './validateSignup.ts';
import { AppStore } from '../../store/main_app/AppStore.ts';
import  {Input, InputPassword } from '../../components/Input.tsx';
import FormLink from '../../components/formLink.tsx';
const SignupPage = () => {
    const [showPassword, setshowPassword] = useState(false);
    const navigate = useNavigate();
    const { theme } = ThemeStore() as themeStore;
    const {Signup} = AppStore() as AppStates;
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validate,
        onSubmit: (values:validSignup) => {
            Signup(values);
        },
    });
    return (
        <div className='registration_page'>
            <motion.form initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:0.7}} onSubmit={formik.handleSubmit} className='registration_form'>
                <h1 className='registration_form_heading'>Create Account</h1>
                <p className='registration_form_subheading'>Get Started with your free account</p>
                <div className='flex flex-col gap-6 mt-4'>

                    {/* full name */}
                    <Input label={"Full Name"} type={"text"} name={'username'} onChange={formik.handleChange} value={formik.values.username} id={'username'} placeholder={"Enter your name"} errors={formik.errors.username} Icon={User} className="form_input"/>

                    {/* Email */}
                    <Input label={"Email"} type={"email"} name={'email'} onChange={formik.handleChange} value={formik.values.email} id={'email'} placeholder={"Enter your email"} errors={formik.errors.email} Icon={Mail} className="form_input"/>

                    {/* password */}
                    <InputPassword label={"Password"} name={'password'} onChange={formik.handleChange} value={formik.values.password} id={'password'} placeholder={"Enter your password"} errors={formik.errors.password} Icon={Lock} setShowPassword={setshowPassword} showPassword={showPassword} className="form_input"/>

                    <button className={`submit_btn ${theme == "dark" ? "text-black" : "text-white"}`}>Signup</button>

                </div>
                <X className="page_closing_btn" onClick={() => navigate("/")} />

                 <FormLink text='Already have an account?' navigateTo='/login' type='Login' />
            </motion.form>
        </div>
    )
}

export default SignupPage