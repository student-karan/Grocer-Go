const Newsletter = () => {
    return (
        <div className="news_letter">
            <h1 className="news_letter_heading">Never Miss a Deal!</h1>
            <p className="news_letter_sub_heading">
                Subscribe to get the latest offers, new arrivals, and exclusive discounts
            </p>
            <form className="news_letter_form_body">
                <input className="news_letter_form_input" type="text" placeholder="Enter your email id" required/>   
                <button type="submit" className="news_letter_form_btn">Subscribe</button>
            </form>
        </div>
    )
}

export default Newsletter