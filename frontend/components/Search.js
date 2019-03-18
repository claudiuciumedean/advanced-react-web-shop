import React, { Component } from "react";
import Downshift, { resetIdCounter } from "downshift";
import Router from "next/router";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import debounce from "lodash.debounce";

import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";

const SEARCH_ITEMS_QUERY = gql`
    query SEARCH_ITEMS_QUERY($searchTerm: String!) {
        items(where: {
            OR: [
                { title_contains: $searchTerm },
                { description_contains: $searchTerm }
            ]
        }) {
            id
            image
            title
        }
    } 
`;

function routeToItem(item) {
    Router.push({
        pathname: "/item",
        query: {
            id: item.id
        }
    })
}

export default class AutoComplete extends Component {
    state = {
        items: [],
        loading: false
    };

    render() { 
        resetIdCounter();

        return (
            <SearchStyles>
                <Downshift itemToString={item => !item ? "" : item.title} onChange={routeToItem}>
                    {({getInputProps, getItemProps, isOpen, inputValue, highlightedIndex}) => (
                        <div>
                            <ApolloConsumer>
                                {(client) => (
                                    <input 
                                        
                                        {...getInputProps({
                                            id: "search",
                                            type: "search",
                                            placeholder: "Search for an item",
                                            className: this.state.loading ? "loading" : "",
                                            onChange: e => {
                                                e.persist();
                                                this.onSearch(e, client);
                                            }
                                        })}
                                    />
                                )}                        
                            </ApolloConsumer>
                            {isOpen && (
                                <DropDown>
                                    {this.state.items.map((item, i) =>
                                        <DropDownItem 
                                            key={item.id}
                                            highlighted = {i === highlightedIndex}
                                            {...getItemProps({ item })}
                                        >
                                            <img width="50" src={item.image} alt={item.title}></img>
                                            {item.title}
                                        </DropDownItem>
                                    )}
                                    {!this.state.items.length && !this.state.loading && (
                                        <DropDownItem>Nothing found {inputValue}</DropDownItem>
                                    )}
                                </DropDown>
                            )}
                            
                        </div>
                    )}
                </Downshift>                
            </SearchStyles>
        );
    }
    
    onSearch = debounce(async (e, client) => {
        this.setState({ loading: true });

        const res = await client.query({
            query: SEARCH_ITEMS_QUERY,
            variables: { searchTerm: e.target.value }
        });

        this.setState({
            items: res.data.items,
            loading: false
        });
    }, 350);
}