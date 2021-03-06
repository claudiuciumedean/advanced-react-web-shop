import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import Form from "./styles/Form";
import ErrorMessage from "./ErrorMessage";

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
                    <Form onSubmit={(e) => this.onFormSubmit(e, createItem)} data-test="form">
                        <ErrorMessage error={error}/>
                        <fieldset disabled={loading} aria-busy={loading}>
                                <label htmlFor="file">
                                    Product image
                                    <input type="file" id="file" name="file" placeholder="Upload an image" required onChange={this.uploadFile}/>
                                    {this.state.image && <img src={this.state.image} alt="Upload preview"/>}                 
                                </label>
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

    uploadFile = async e => {
        const files = e.target.files;
        const data = new FormData();

        data.append("file", files[0]);
        data.append("upload_preset", "sickfits");

        const res = await fetch("https://api.cloudinary.com/v1_1/dgfogulkz/image/upload", {
            method: "POST",
            body: data
        });

        const file = await res.json();
        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url
        });
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