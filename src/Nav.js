const Nav = () => {
    return(
        <nav>
            <div className="wrapper">
                <ul className="flexContainer">
                    <li>
                        <p className='logo'>Oat & Honey</p>
                    </li>
                    <li className='shoppingContainer'>
                        <button>
                            <i className="fa-solid fa-cart-shopping shoppingCart" aria-hidden="true"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;