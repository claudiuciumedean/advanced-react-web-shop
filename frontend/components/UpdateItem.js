import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import Form from "./styles/Form";
import ErrorMessage from "./ErrorMessage";

import formatMoney from "../lib/formatMoney";

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: { id: $id  }) {
            id
            title
            description
            price
        }
    }
`;

const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION (
        $id: ID!
        $title: String
        $description: String
        $price: Int
    ) {
        updateItem(
            id: $id
            title: $title
            description: $description
            price: $price
        ) {
            id
            title
            description
            price
        }
    }
`;

export default class UpdateItem extends Component {
    state = {};

    render() {
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
                {({data, loading}) => {            
                    if(loading) {
                        return (
                            <p>Loading....</p>
                        );
                    }

                    if(!data.item) {
                        return (
                             <p>No item found</p>
                        )
                    }

                    const { title, price, description } = data.item;
                    return (                    
                        <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
                            {(updateItem, { loading, error }) => (                
                                <Form onSubmit={(e) => this.onFormSubmit(e, updateItem)}>
                                    <ErrorMessage error={error}/>
                                    <fieldset disabled={loading} aria-busy={loading}>
                                            <label htmlFor="title">
                                                Title
                                                <input type="text" id="title" name="title" placeholder="Title" required defaultValue={title} onChange={this.handleChange}/>                        
                                            </label>
                                            <label htmlFor="price">
                                                Price 
                                                <input type="number" id="price" name="price" placeholder="Price" required defaultValue={price} onChange={this.handleChange}/>                        
                                            </label>
                                            <label htmlFor="description">
                                                Description
                                                <textarea id="description" name="description" placeholder="Enter a description" required defaultValue={description} onChange={this.handleChange}></textarea>                        
                                            </label>
                                            <button type="submit">Save changes</button>
                                    </fieldset>
                                </Form>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }

    handleChange = e => {
        let {name, value, type } = e.target;
        value = type === "number" ? parseFloat(value) : value;       
        this.setState({ [name]: value });
    }

    onFormSubmit = async (e, updateItem) => {
        e.preventDefault();
        console.log(this.props)
        const res = await updateItem({
            variables: {
                id: this.props.id,
                ...this.state
            }
        });

        console.log(res);
    }
}

export { UPDATE_ITEM_MUTATION };