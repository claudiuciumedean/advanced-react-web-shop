import { mount } from "enzyme";
import wait from "waait";
import toJSON from "enzyme-to-json";
import { MockedProvider } from "react-apollo/test-utils";
import Router from "next/router";

import { fakeUser } from "../lib/testUtils";

import Signup, { SIGNUP_MUTATION } from "../components/Signup";
import { CURRENT_USER_QUERY } from "../components/User";
import { ApolloConsumer } from "react-apollo";

Router.router = {
    push() {}
};
const me = fakeUser();
const { email, name } = me
const mocks = [
    {    
        request: {
            query: SIGNUP_MUTATION,
            variables: { email, name, password:"qwerty" }
        },
        result: {
            data: {
                signup: {
                    __typename: "User",
                    id: "abc123",
                    email,
                    name
                }
            }
        }
    },
    {
        request: {
            query: CURRENT_USER_QUERY
        },
        result: {
            data: { 
                me 
            }
        }
    }
];
const type = (wrapper, name, value) => {
    wrapper.find(`input[name="${name}"]`).simulate("change", {
        target: { name, value }
    });
}

describe("<Signup/>", () => {
    it("renders and mathches snapshot", async () => {
        const wrapper = mount(
            <MockedProvider>
                <Signup/>
            </MockedProvider>
        );

        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it("calls the mutation properly", async () => {
        let apolloClient;
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <ApolloConsumer>
                    {client => {
                        apolloClient = client;
                        return ( 
                            <Signup/> 
                        );
                    }}
                </ApolloConsumer>
            </MockedProvider>
        );

        await wait();
        wrapper.update();

        type(wrapper, "name", name);
        type(wrapper, "email", email);
        type(wrapper, "password", "qwerty");

        wrapper.update();        
        wrapper.find("form").simulate("submit");

        await wait();

        const user = await apolloClient.query({ query: CURRENT_USER_QUERY });
        expect(user.data.me).toMatchObject(me);
    });
});