import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Dot = styled.div`
    min-width:3rem; margin-left:1rem; padding:.5rem; border-radius:50%; font-weight:100; font-feature-settings:"enum"; font-variant-numeric:tabular-nums; line-height:2rem; color:${props => props.theme.white}; background:${props => props.theme.red};
`;

const AnimationStyles = styled.span`
    position:relative;
    .count { display:block; position:relative; backface-visibility:hidden; transition:transform .4s; }

    .count-enter { transform:rotateX(.5turn); }
    .count-enter-active { transform:rotateX(0); }

    .count-exit { position:absolute; top:0; transform:rotateX(0); }
    .count-exit-active { transform:rotateX(.5turn); }
`;

const CartCount = ({ count }) => (
    <AnimationStyles>
        <TransitionGroup>
            <CSSTransition
                unmountOnExit
                className="count"
                classNames="count"
                key={count}
                timeout={{ enter: 400, exit: 400 }}
            >
                <Dot>
                    {count}
                </Dot>
            </CSSTransition>
        </TransitionGroup>
    </AnimationStyles>
);

CartCount.propTypes = {
    count: PropTypes.number.isRequired 
};

export default CartCount;