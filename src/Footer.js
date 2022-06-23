const Footer = () => {
    return(
        <footer role="contentinfo">
            <div className="wrapper">
                <div className="flexContainer">
                    <ul className="footerContact">
                        <li>
                            <h3>Contact</h3>
                        </li>
                        <li>
                            <address>123-456-7890</address>
                        </li>
                        <li>
                            <address>500 Oatmeal Street <span>San Francisco, CA 94158</span></address>
                        </li>
                    </ul>
                    <ul className="footerUpdated">
                        <h3 className="middleHeading">Stay Updated</h3>
                        <p>Subscribe to our newsletter to stay updated.</p>
                        <form action="#">
                            <label htmlFor="userEmail" className="sr-only">Email Address</label>
                            <input id="userEmail" type="email" placeholder="Email Address" required/>
                            <button type="submit">Submit</button>
                        </form>
                    </ul>
                    <ul className="footerSocials">
                        <li>
                            <h3 className="lastHeading">Socials</h3>
                        </li>
                        <li>
                            <p>Book an appointment</p>
                            <ul className="flexContainer">
                                <li>
                                    <a href="https://www.etsy.com/ca/shop/JnLNaturals" target="_blank" rel="noreferrer">
                                        <span className="sr-only">Go to Oat & Honey's Instagram</span>
                                        <i className="fa fa-instagram"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.etsy.com/ca/shop/JnLNaturals" target="_blank" rel="noreferrer">
                                        <span className="sr-only">Go to Oat & Honey's Facebook</span>
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.etsy.com/ca/shop/JnLNaturals" target="_blank" rel="noreferrer">
                                        <span className="sr-only">Go to Oat & Honey's Snapchat</span>
                                        <i className="fa fa-snapchat"></i>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;