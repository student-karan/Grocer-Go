import {motion} from 'motion/react'; 
import { Link } from 'react-router-dom';
import { MoveRight } from "lucide-react";
import { LinkProps } from '../Helpers/types.ts';

const FormLink = ({text,navigateTo,type}:LinkProps) => {
    const MotionLink = motion(Link);
    const MotionArrowRight = motion(MoveRight);
    return (
        <div className='flex items-center self-center gap-1 text-sm'>
            <p>{text}</p>
            <MotionLink whileHover="hover" to={navigateTo} className='flex items-center text-orange-500'>{type}
                <br />
                <MotionArrowRight variants={{ hover: { x: 10 } }} initial={{ x: 0 }} className='ml-1'/>
            </MotionLink>
        </div>
    )
}

export default FormLink