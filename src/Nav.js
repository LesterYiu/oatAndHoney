import logo from './logo.png';

const Nav = () => {
    return(
        <nav>
            <div className="wrapper">
                <ul className="flex-container">
                    <li>
                        <div className="logo-container">
                            <img src={logo} alt="Oat & Honey company logo" />
                        </div>
                    </li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;