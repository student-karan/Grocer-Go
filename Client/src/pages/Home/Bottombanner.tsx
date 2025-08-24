import { assets, features } from "../../assets/assets.ts";
import { Property } from "../../Helpers/types.ts";

const Bottombanner = () => {
    return (
        <div className="relative w-[95%]">
            <img src={assets.bottom_banner_image} alt="banner" className="banner" />
            <img src={assets.bottom_banner_image_sm} alt="banner" className="banner_sm" />
            <div className="text_container_outer">
                <div className="text_container_inner">
                    <h1 className="text_container_main_heading">Why are we the best?</h1>
                    {features.map((ft, idx) => {
                        return (
                            <Feature key={idx} feature={ft} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const Feature = ({ feature }: { feature: Property }) => {
    return (
        <div className="flex items-center gap-4">
            <img src={feature.icon} alt="feature" />
            <div>
                <p className="feature_title">{feature.title}</p>
                <p className="feature_description">{feature.description}</p>
            </div>
        </div>
    )
}
export default Bottombanner