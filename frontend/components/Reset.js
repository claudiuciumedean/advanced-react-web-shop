import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import PropTypes from "prop-types";

import { CURRENT_USER_QUERY } from "./User";
import Form from "./styles/Form";
import Error from "./ErrorMessage";

const RESET_MUTATION = gql`
    mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
        resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
            id
            email
            name
        }
    }
`;

export default class Reset extends Component {
    state = { password: "", confirmPassword: "" };

    render() {
        return (
            <Mutation 
                mutation={RESET_MUTATION} 
                variables={{
                    resetToken: this.props.resetToken,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword
                }}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
                {(reset, {error, loading}) => (          
                <Form method="POST" onSubmit={e => this.onFormSubmit(e, reset)}>
                    <fieldset disabled={loading} aria-busy={loading}>                    
                        <h2>Reset your password</h2>

                        <Error error={error}/>

                        <label htmlFor="password">
                            Password
                            <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.saveToState}/>
                        </label>

                        <label htmlFor="confirmPassword">
                            Confirm Password
                            <input type="password" name="confirmPassword" placeholder="confirm password" value={this.state.confirmPassword} onChange={this.saveToState}/>
                        </label>

                        <button type="submit">Reset your password!</button>
                    </fieldset>
                </Form>
                )}      
            </Mutation>                      
        );
    }

    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onFormSubmit(e, reset) {
        e.preventDefault();
        await reset();

        this.setState({ password: '', confirmPassword: '' });
        Router.push({
            pathname: "/items"
        });
    }

    static propTypes = {
        resetToken: PropTypes.string.isRequired
    }
}