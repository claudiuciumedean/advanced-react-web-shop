import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";

import { fakeUser } from "../lib/testUtils";

import PleaseSignin from "../components/PleaseSignin";
import { CURRENT_USER_QUERY } from "../components/User";

const notSignInMocks = [{
    request: { query: CURRENT_USER_QUERY},
    result: { 
        data: {
            me: null
        }
    }
}];

const signedInMocks = [{
    request: { query: CURRENT_USER_QUERY},
    result: {
        data: {
            me: fakeUser()
        }
    }
}];

describe("<PleaseSignin/>", () => {
    it("renders the sign in dialog to logged out user", async () => {
        const wrapper = mount(
            <MockedProvider mocks={notSignInMocks}>
                <PleaseSignin/>
            </MockedProvider>
        );

        await wait();
        wrapper.update();
        
        expect(wrapper.text()).toContain("Please Sign in before continuing");
        expect(wrapper.find("Signin").exists()).toBe(true);
    });

    it("renders the child component when user is signed in", async () => {
        const Child = () => <p>Dummy child component!</p>;

        const wrapper = mount(
            <MockedProvider mocks={signedInMocks}>
                <PleaseSignin>
                    <Child/>
                </PleaseSignin>
            </MockedProvider>
        );

        await wait();
        wrapper.update();

        expect(wrapper.contains(<Child/>)).toBe(true);
    });
});