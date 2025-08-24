const Sectionheading = ({ title }:{title:string}) => {
  return (
     <div className="section_heading_container">
                <h1 className="section_heading">{title}</h1>
                <div className="heading_underline"></div>
            </div>
  )
}
export default Sectionheading