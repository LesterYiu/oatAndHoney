import honeyIcon from "./honeyIcon.png";
import { Link } from "react-router-dom";

const Nav = (props) => {
    const {setIsCartClicked, isCartClicked, itemList} = props;

    return(
        <nav>
            <a href="#gallerySection" className="skipToMain">Skip to Main</a>
            <div className="wrapper">
                <ul className="flexContainer">
                    <li>
                        <Link to="/">
                            <span className="flexContainer">
                                <img src={honeyIcon} alt="" className="honeyIcon"/>
                                <p className="logo"> <span aria-hidden="true" className="logoDivider">|</span> Oat & Honey</p>
                            </span>
                        </Link>
                    </li>
                    <li className="shoppingContainer">
                        <div className="cartContainer">
                            <button className="cartButton" onClick={() => {setIsCartClicked(!isCartClicked)}}>
                                <i className="fa-solid fa-cart-shopping shoppingCart" aria-hidden="true"></i>
                            </button>
                            <span className="cartNumber">{itemList.length}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;