import React, { Component } from "react";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import PropTypes from "prop-types";
import gql from "graphql-tag";

import { CURRENT_USER_QUERY } from "./User";

const REMOVE_FROM_CART_MUTATION = gql`
    mutation removeFromCart($id: ID!) {
        removeFromCart(id: $id) {
            id
        }
    }
`;

const Button = styled.button`
    font-size:3rem; border:0; background:none;
    &:hover { color:${props => props.theme.red}; cursor:pointer; }
`;

export default class RemoveFromCart extends Component {
    render () {
        return (
            <Mutation mutation={REMOVE_FROM_CART_MUTATION} variables={{ id: this.props.id }} update={this.update} optimisticResponse={{ 
                __typename: "Mutation", 
                removeFromCart: {
                    __typename: "CartItem",
                    id: this.props.id 
                } 
            }}>
                {(removeFromCart, { loading, error }) => (
                    <Button title="Delete Item" onClick={() => this.removeItem(removeFromCart)} disabled={loading}>
                        &times;
                    </Button>
                )}
            </Mutation>
            
        ); 
    }

    removeItem = removeFromCart => {
        removeFromCart().catch(err => alert(err.message));
    }

    update = (cache, payload) => {
        const data = cache.readQuery({query: CURRENT_USER_QUERY});
        const cartItemId = payload.data.removeFromCart.id;
        data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
        
        cache.writeQuery({ query: CURRENT_USER_QUERY, data });
    }

    static propTypes = {
        id: PropTypes.string.isRequired
    }
}