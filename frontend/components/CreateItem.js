import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import Form from "./styles/Form";
import ErrorMessage from "./ErrorMessage";

import formatMoney from "../lib/formatMoney";

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION (
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
    ) {
        createItem(
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage: $largeImage
        ) {
            id
        }
    }
`;

export default class CreateItem extends Component {
    state = {
        title: "",
        description: "",
        image: "",
        largeImage: "",
        price: 0   
    };

    render() {
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
                {(createItem, { loading, error }) => (                
                    <Form onSubmit={(e) => this.onFormSubmit(e, createItem)}>
                        <ErrorMessage error={error}/>
                        <fieldset disabled={loading} aria-busy={loading}>
                                <label htmlFor="title">
                                    Title
                                    <input type="text" id="title" name="title" placeholder="Title" required value={this.state.title} onChange={this.handleChange}/>                        
                                </label>
                                <label htmlFor="price">
                                    Price 
                                    <input type="number" id="price" name="price" placeholder="Price" required value={this.state.price} onChange={this.handleChange}/>                        
                                </label>
                                <label htmlFor="description">
                                    Description
                                    <textarea id="description" name="description" placeholder="Enter a description" required value={this.state.description} onChange={this.handleChange}></textarea>                        
                                </label>
                                <button type="submit">Submit</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }

    handleChange = e => {
        let {name, value, type } = e.target;
        value = type === "number" ? parseFloat(value) : value;       
        this.setState({ [name]: value });
    }

    onFormSubmit = async (e, createItem) => {
        e.preventDefault();
        const res = await createItem();
        Router.push({
            pathname: "/item",
            query: { id: res.data.createItem.id }
        });
    }
}

export { CREATE_ITEM_MUTATION };