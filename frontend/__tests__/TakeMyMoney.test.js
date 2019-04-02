import { mount } from "enzyme";
import wait from "waait";
import toJSON from "enzyme-to-json";
import { MockedProvider } from "react-apollo/test-utils";
import { ApolloConsumer } from "react-apollo";
import Router from "next/router";
import NProgress from "nprogress";

import Cart, { LOCAL_STATE_QUERY } from "../components/Cart";
import { CURRENT_USER_QUERY } from "../components/User";
import TakeMyMoney, { CREATE_ORDER_MUTATION } from "../components/TakeMyMoney";

import { fakeUser, fakeCartItem } from "../lib/testUtils";

Router.router = { push() {} };

const mocks = [
    {
        request: { query: CURRENT_USER_QUERY },
        result: {
            data: {
                me: {
                    ...fakeUser(),
                    cart: [fakeCartItem()]
                }
            }
        }
    }
];

describe("<TakeMyMoney/>", () => {
    it("renders and mathches the snapshot", async () => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <TakeMyMoney/>
            </MockedProvider>
        );

        await wait();
        wrapper.update();

        const checkoutButton = wrapper.find("ReactStripeCheckout");
        expect(toJSON(checkoutButton)).toMatchSnapshot();
    });

    it("creates an order ontoken", async () => {
        const createOrderMock = jest.fn().mockResolvedValue({
            data: {
                createOrder: {
                    id: "xyz789"
                }
            }
        });

        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <TakeMyMoney/>
            </MockedProvider>
        );

        const component = wrapper.find("TakeMyMoney").instance();
        
        component.onToken({ id: "abc123" }, createOrderMock);
        expect(createOrderMock).toHaveBeenCalled();
        expect(createOrderMock).toHaveBeenCalledWith({ variables: { token: "abc123" }});
    });

    it("turn the progress bar on", async () => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <TakeMyMoney/>
            </MockedProvider>
        );
        NProgress.start = jest.fn();

        const createOrderMock = jest.fn().mockResolvedValue({
            data: {
                createOrder: {
                    id: "xyz789"
                }
            }
        });

        const component = wrapper.find("TakeMyMoney").instance();
        
        component.onToken({ id: "abc123" }, createOrderMock);
        expect(createOrderMock).toHaveBeenCalled();
        expect(NProgress.start).toHaveBeenCalled();
    });

    it("routes to the order page when completed", async () => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <TakeMyMoney/>
            </MockedProvider>
        );
        const createOrderMock = jest.fn().mockResolvedValue({
            data: {
                createOrder: {
                    id: "xyz789"
                }
            }
        });
        const component = wrapper.find("TakeMyMoney").instance();
        Router.router.push = jest.fn();
        component.onToken({ id: "abc123" }, createOrderMock);

        await wait();
        expect(Router.router.push).toHaveBeenCalled();
    });
});