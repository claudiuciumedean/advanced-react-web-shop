import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            id
            email
            name
        }
    }
`;

export default class Signin extends Component {
    state = {
        name: "",
        email: "",
        password: ""
    };

    render() {
        return (
            <Mutation mutation={SIGNIN_MUTATION} variables={this.state} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
                {(signin, {error, loading}) => (          
                <Form method="POST" onSubmit={e => this.onFormSubmit(e, signin)}>
                    <fieldset disabled={loading} aria-busy={loading}>                    
                        <h2>Sign into your account</h2>
                        <Error error={error}/>

                        <label htmlFor="email">
                            Email
                            <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.saveToState}/>
                        </label>

                        <label htmlFor="password">
                            Password
                            <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.saveToState}/>
                        </label>

                        <button type="submit">Sign in!</button>
                    </fieldset>
                </Form>
                )}      
            </Mutation>                      
        );
    }

    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onFormSubmit(e, signin) {
        e.preventDefault();
        await signin();

        this.setState({ name: "", email: "", password: "" });
        Router.push({
            pathname: "/items"
        });
    }
}