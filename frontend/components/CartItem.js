import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import formatMoney from "../lib/formatMoney";

import RemoveFromCart from "./RemoveFromCart";

const CartItemStyles = styled.li`
    display:grid; align-items:center; grid-template-columns:auto 1fr auto; padding:1rem 0; border-bottom:.1rem solid ${props => props.theme.lightgrey};
    img { width:10rem; margin-right:1rem; }
    h3, p { margin:0; }
`;

const CartItem = ({ cartItem }) => {
    if(!cartItem.item) {
        return (
            <CartItemStyles>
                <p>This item has been removed</p>
                <RemoveFromCart id={cartItem.id} />
            </CartItemStyles>
        );
    }

    const { image, title, price } = cartItem.item;
    return (
        <CartItemStyles>
            <img src={image} alt={title}></img>
            <div className="cart-item-details">
                <h3>{title}</h3>
                <p>
                    {formatMoney(price * cartItem.quantity)}
                    -
                    <em>{cartItem.quantity} &times; {formatMoney(price)} each</em>
                </p>
            </div>
            <RemoveFromCart id={cartItem.id} />
        </CartItemStyles>
    )
};


CartItem.propTypes = {
    cartItem: PropTypes.object.isRequired
}

export default CartItem;