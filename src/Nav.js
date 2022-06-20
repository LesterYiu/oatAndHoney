const Nav = (props) => {
    const {setIsCartClicked, isCartClicked, itemList} = props;

    return(
        <nav>
            <div className="wrapper">
                <ul className="flexContainer">
                    <li>
                        <p className='logo'>Oat & Honey</p>
                    </li>
                    <li className='shoppingContainer'>
                        <div className="cartContainer">
                            <button onClick={() => {setIsCartClicked(!isCartClicked)}}>
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