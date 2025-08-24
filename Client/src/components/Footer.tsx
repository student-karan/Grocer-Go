import { Link } from "react-router-dom";
import { footerLinks, assets } from "../assets/assets.ts";
const Footer = () => {
    return (
        <footer className="footer_container">
            <div className="footer_main_body">

                <aside className="website_logo_and_moto">
                    <Link to={"/"} className="web_logo">
                        <img className="h-24" src={assets.web_logo} alt="website logo" />
                        <p className="text-4xl text-orange-700">GrocerGo</p>
                    </Link>
                    <p className="company_moto">We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.</p>
                </aside>

                <div className="footer_link_sections">
                    {footerLinks.map((section, idx) => {
                        return (<nav key={idx} className="link_section">
                            <h6 className="footer_link_section_heading">{section.title}</h6>
                            {section.links.map((link, idx) => {
                                return (<Link className="footer_link" to={link.url} key={idx}>{link.text}</Link>)
                            })}
                        </nav>)
                    })}
                </div>

            </div>
            <div className="separator"></div>
            <aside className="footer_copyright_section">© {new Date().getFullYear()} Grocer-Go - All right reserved | Developed by <Link to={"https://www.linkedin.com/in/jasmeet-singh-352100261/"} className="text-sky-600 underline">Jasmeet Singh</Link></aside>
        </footer>
    )
}

export default Footer