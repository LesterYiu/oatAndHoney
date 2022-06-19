import shoppingCart from './shoppingCart.png'

const Nav = () => {
    return(
        <nav>
            <div className="wrapper">
                <ul className="flexContainer">
                    <li>
                        {/* <div className="logo-container">
                            <img src={logo} alt="Oat & Honey company logo" />
                        </div> */}
                        <p className='logo'>Oat & Honey</p>
                    </li>
                    <li className='shoppingContainer'>
                        <button>
                            <img className='shoppingCart' src={shoppingCart} alt="" />
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;