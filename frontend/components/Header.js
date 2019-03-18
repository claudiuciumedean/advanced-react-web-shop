import Link from "next/link";
import styled from "styled-components";
import Router from "next/router";
import NProgress from "nprogress";

import Nav from "./Nav";
import Cart from "./Cart";
import Search from "./Search";

Router.onRouteChangeStart = () => {
    NProgress.start();
}

Router.onRouteChangeComplete = () => {
    NProgress.done();
}

Router.onRouteChangeError = () => {
    NProgress.done();
}


const Logo = styled.h1`
    position:relative; transform:skew(-7deg); font-size:4rem; margin-left:2rem; z-index:2;
    a { padding:.5rem 1rem; background:${props => props.theme.red}; color:${props => props.theme.red}; color:${props => props.theme.white}; text-transform:uppercase; text-decoration:none; }

    @media(max-width:1300px) {
        margin:0; text-align:center;
    }
`;

const StyledHeader = styled.header`
    .bar { display:grid; grid-template-columns:auto 1fr; justify-content:space-between; align-items:stretch; border-bottom:10px solid ${props => props.theme.black}; 
        @media(max-width:1300px) {
            grid-template-columns:1fr; justify-content:center;
        }
    }

    .sub-bar { display:grid; grid-template-columns:1fr auto; border-bottom:1px solid ${props => props.theme.lightgrey}; }
`;

const Header = () => (
    <StyledHeader>
        <div className="bar">
            <Logo>
                <Link href="/">            
                    <a>Sick Fits</a>
                </Link>
            </Logo>
            <Nav />
        </div>
        <div className="sub-bar">
           <Search/>
        </div>
        <Cart/>
    </StyledHeader>
);

export default Header;