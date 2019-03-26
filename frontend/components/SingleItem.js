import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Head from "next/head";

import Error from "./ErrorMessage"

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: { id: $id  }) {
            id
            title
            description
            price
            largeImage
        }
    }
`;

const SingleItemStyles = styled.div`
    display:grid; grid-auto-columns:1fr; grid-auto-flow:column; max-width:1200px; min-height:800px; margin:2rem auto; box-shadow:${props => props.theme.bs};
    img { width:100%; height:100%; object-fit:contain; }
    .details { margin:3rem; font-size:2rem; }
`;

export default class SingleItem extends Component {
    render() {
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
                {({error, loading, data}) => {
                    if(error) {
                        return (
                           <Error error={error}></Error>
                        );
                    }

                    if(loading) {
                        return (
                            <p>Loading...</p>
                        );
                    }

                    if(!data.item) {
                        return (
                            <p>No item found!</p>
                        );
                    }

                    const { largeImage, title, description } = data.item;
                    return (
                        <SingleItemStyles>
                            <Head>
                                <title>Sick Fits | {title}</title>
                            </Head>

                            <img src={largeImage} alt={title}/>
                            <div className="details">
                                <h2>Viewing {title}</h2>
                                <p>{description}</p>
                            </div>
                        </SingleItemStyles>
                    );
                }}
            </Query>
        );
    }
}

export { SINGLE_ITEM_QUERY };