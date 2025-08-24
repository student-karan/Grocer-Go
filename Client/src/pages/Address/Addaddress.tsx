import Sectionheading from "../../components/Sectionheading.tsx";
import { useFormik } from "formik";
import { ThemeStore } from "../../store/main_app/ThemeStore.ts";
import { addressInput, AppStates, themeStore, validAddress } from "../../Helpers/types.ts";
import { assets } from "../../assets/assets.ts";
import { motion } from "motion/react";
import { validate } from "./validateaddress.ts";
import { AppStore } from "../../store/main_app/AppStore.ts";
import { useNavigate } from "react-router-dom";

const Addaddress = () => {
    const { addAddress } = AppStore() as AppStates;
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            street: "",
            city: "",
            state: "",
            zipcode: "",
            country: "",
            phone: "",
        },
        validate,
        onSubmit: async (values: validAddress) => {
            const res = await addAddress(values);
            if (res) {
                navigate("/cart");
            }
        },
    });

    return (
        <div className="w-full flex flex-col gap-10 px-20">
            <Sectionheading title="Add Shipping Address" />
            <div className="w-full flex md:flex-row items-center justify-between gap-20">
                <form method="post" onSubmit={formik.handleSubmit} className="md:w-fit sm:w-full flex flex-col items-center gap-4 md:ml-6">

                    <div className="w-full flex md:flex-row flex-col gap-4">
                        <Inputfield type="text" name="firstName" placeholder="First Name" value={formik.values.firstName} onChange={formik.handleChange} className={`w-full address_input`}
                            errors={formik.errors.firstName} />

                        <Inputfield type="text" name="lastName" placeholder="Last Name" value={formik.values.lastName} onChange={formik.handleChange} className={`w-full address_input`}
                            errors={formik.errors.lastName} />
                    </div>
                    <Inputfield type="email" name="email" placeholder="Email Address" value={formik.values.email} onChange={formik.handleChange} className={`w-full address_input`}
                        errors={formik.errors.email} />

                    <Inputfield type="text" name="street" placeholder="Street" value={formik.values.street} onChange={formik.handleChange} className={`w-full address_input`}
                        errors={formik.errors.street} />

                    <div className="w-full flex md:flex-row flex-col gap-4">
                        <Inputfield type="text" name="city" placeholder="City" value={formik.values.city} onChange={formik.handleChange} className={`w-full address_input`}
                            errors={formik.errors.city} />

                        <Inputfield type="text" name="state" placeholder="State" value={formik.values.state} onChange={formik.handleChange} className={`w-full address_input`}
                            errors={formik.errors.state} />
                    </div>
                    <div className="w-full flex md:flex-row flex-col gap-4">
                        <Inputfield type="text" name="zipcode" placeholder="Zip Code" value={formik.values.zipcode} onChange={formik.handleChange} className={`w-full address_input`}
                            errors={formik.errors.zipcode} />

                        <Inputfield type="text" name="country" placeholder="Country" value={formik.values.country} onChange={formik.handleChange} className={`w-full address_input`}
                            errors={formik.errors.country} />
                    </div>

                    <Inputfield type="text" name="phone" placeholder="Phone Number" value={formik.values.phone} onChange={formik.handleChange} className={`w-full address_input`}
                        errors={formik.errors.phone} />

                    <motion.button whileHover={{ scale: 0.90 }} whileTap={{ scale: 1 }} className="address_formbtn">Save Address</motion.button>
                </form>
                <img src={assets.add_address_image} alt="address image" className="lg:w-1/2 xl:w-fit md:flex hidden w-60 self-end" />
            </div>
        </div>
    )
}

const Inputfield = ({ errors, className, ...props }: addressInput) => {
    const { theme } = ThemeStore() as themeStore;
    const Theme: string = theme === "light" ? "border-[1px] border-neutral" : "";

    return (<div className="w-full flex flex-col items-start">
        <input {...props} className={`${Theme} ${className}`} />
        {errors && <p className="errormsg_input">{errors}</p>}
    </div>)
}

export default Addaddress