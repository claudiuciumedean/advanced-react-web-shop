import Nav from "./Nav";
import Link from "next/link";
import styled from "styled-components";

const Logo = styled.h1`
    position:relative; transform:skew(7deg); font-size:4rem; margin-left:2rem; z-index:2;
    
`;

const Header = () => (
    <div>
        <div className="bar">
        <h1>
            <Link href="">            
                <a>Sick Fits</a>
            </Link>
        </h1>
        <Nav />
        </div>
        <div className="sub-bar">
        <p>Search</p>
        </div>
        <div>Cart</div>
    </div>
);

export default Header;