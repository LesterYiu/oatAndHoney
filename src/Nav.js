const Nav = (props) => {
    const {setIsCartClicked, isCartClicked, itemList} = props;

    return(
        <nav>
            <a href='#gallerySection' className='skipToMain'>Skip to Main</a>
            <div className="wrapper">
                <ul className="flexContainer">
                    <li>
                        <p className='logo'>Oat & Honey</p>
                    </li>
                    <li className='shoppingContainer'>
                        <div className='cartContainer'>
                            <button className='cartButton' onClick={() => {setIsCartClicked(!isCartClicked)}}>
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