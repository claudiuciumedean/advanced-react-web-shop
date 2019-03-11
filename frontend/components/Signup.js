import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import Form from "./styles/Form";
import Error from "./ErrorMessage";

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
        signup(email: $email, name: $name, password: $password) {
            id
            email
            name
        }
    }
`;

export default class Signup extends Component {
    state = {
        name: "",
        email: "",
        password: ""
    };

    render() {
        return (
            <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
                {(signup, {error, loading}) => (          
                <Form method="POST" onSubmit={e => this.onFormSubmit(e, signup)}>
                    <fieldset disabled={loading} aria-busy={loading}>                    
                        <h2>Sign up for an account</h2>
                        <Error error={error}/>

                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.saveToState}/>

                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.saveToState}/>

                        <label htmlFor="password">Email</label>
                        <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.saveToState}/>

                        <button type="submit">Sign up!</button>
                    </fieldset>
                </Form>
                )}      
            </Mutation>                      
        );
    }

    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onFormSubmit(e, signup) {
        e.preventDefault();
        await signup();
        this.setState({ name: "", email: "", password: "" });
    }
}