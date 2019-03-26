import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";

import { fakeUser } from "../lib/testUtils";

import Nav from "../components/Nav";
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


describe("<Nav/>", () => {
    it("renders a minimal nav when signed out", async () => {
        const wrapper = mount(
            <MockedProvider mocks={notSignInMocks}>
                <Nav/>
            </MockedProvider>
        );

        await wait();
        wrapper.update()

        const nav = wrapper.find(`ul[data-test="nav"]`);
        expect(nav.children().length).toBe(2);
        expect(nav.text()).toContain("Sign in")
    });

    it("renders a full nav when signed in", async () => {
        const wrapper = mount(
            <MockedProvider mocks={signedInMocks}>
                <Nav/>
            </MockedProvider>
        );

        await wait();
        wrapper.update()

        const nav = wrapper.find(`ul[data-test="nav"]`);
        expect(nav.children().length).toBe(6);
        expect(nav.text()).toContain("Sign out")
    });
})