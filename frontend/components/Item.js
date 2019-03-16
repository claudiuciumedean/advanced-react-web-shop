import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import formatMoney from "../lib/formatMoney"; 

import DeleteItem from "./DeleteItem";
import AddToCart from "./AddToCart";

import Title from "./styles/Title";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";

export default class Item extends Component {
    render() {
        const { id, image, title, price } = this.props.item;

        return (
            <ItemStyles>
                {image && <img src={image} alt={title}></img>}
                <Title>
                    <Link href={{ pathname: "/item", query: { id: id } }}>
                        <a>{title}</a>
                    </Link>                
                </Title>
                <PriceTag>
                    {formatMoney(price)}
                </PriceTag>
                <div className="buttonList">
                    <Link href={{
                        pathname: "update",
                        query: { id: id }
                    }}>
                        <a>Edit </a>
                    </Link>
                    <AddToCart id={id}/>
                    <DeleteItem id={id}>Delete Item</DeleteItem>
                </div>
            </ItemStyles>
        );
    }

    static propTypes = {
        item: PropTypes.object.isRequired
    };
}