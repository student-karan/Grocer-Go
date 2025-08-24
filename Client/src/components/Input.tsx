import { formIInputPasswordData, formInputdata } from "../Helpers/types.ts"
import { Eye, EyeOff } from "lucide-react"

const Input = ({ Icon, errors, label, ...props }: formInputdata) => {
    return (
        <div className='form_input_container'>
            {label && <label htmlFor="username">{label}</label>}
            <div className='relative'>
                <input {...props} />
                {Icon && <Icon className='form_icon' />}
            </div>
            {errors && <p className='errormsg_input'>{errors}</p>}
        </div>
    )
}
const InputPassword = ({ setShowPassword,showPassword, Icon, errors, label, ...props }: formIInputPasswordData) => {
    return (
        <div className='form_input_container'>
            {label && <label htmlFor="username">{label}</label>}
            <div className='relative'>
                <input type={showPassword ? "text" : "password"}
                    placeholder={showPassword ? "Enter your password" : "•••••••••••"}
                    {...props} />
                {Icon && <Icon className='form_icon' />}
                {showPassword ?
                    <EyeOff className='form_password_icon' onClick={() => setShowPassword(false)} />
                    : <Eye className='form_password_icon' onClick={() => setShowPassword(true)} />}
            </div>
            {errors && <p className='errormsg_input'>{errors}</p>}
        </div>
    )
}

export { Input, InputPassword };