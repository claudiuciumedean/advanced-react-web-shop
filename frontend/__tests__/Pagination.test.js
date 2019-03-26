import { mount } from "enzyme";
import wait from "waait";
import toJSON from "enzyme-to-json";
import { MockedProvider } from "react-apollo/test-utils";
import Router from "next/router";

import Pagination, { PAGINATION_QUERY } from "../components/Pagination";

Router.router = {
    push() {},
    prefetch() {}
};

const makeMockFor = amount => {
    return [{
        request: {
            query: PAGINATION_QUERY
        },
        result: {
            data: {
                itemsConnection: {
                    __typename: "aggregate",
                    aggregate: {
                        __typename: "count",
                        count: amount
                    }
                }
            }
        }
    }];
}

describe("<Pagination/>", () => { 
    it("displays a loading message", () => {
        const wrapper = mount(
            <MockedProvider mocks={makeMockFor(1)}>
                <Pagination page={1}/>
            </MockedProvider>
        );

        expect(wrapper.text()).toContain("Loading...");
    });

    it("renders pagination for n amount of items", async () => {
        const wrapper = mount(
            <MockedProvider mocks={makeMockFor(18)}>
                <Pagination page={1}/>
            </MockedProvider>
        );

        await wait();
        wrapper.update();
        
        const pagination = wrapper.find(`div[data-test="pagination"]`);

        expect(wrapper.find(".total-pages").text()).toEqual("5");
        expect(toJSON(pagination)).toMatchSnapshot();
    });
    
    it("disables prev button on the first page", async () => {
        const wrapper = mount(
            <MockedProvider mocks={makeMockFor(18)}>
                <Pagination page={1}/>
            </MockedProvider>
        );

        await wait();
        wrapper.update();

        expect(wrapper.find("a.prev").prop("aria-disabled")).toEqual(true);
        expect(wrapper.find("a.next").prop("aria-disabled")).toEqual(false);
    });

    it("disables next button on the last page", async () => {
        const wrapper = mount(
            <MockedProvider mocks={makeMockFor(18)}>
                <Pagination page={5}/>
            </MockedProvider>
        );

        await wait();
        wrapper.update();

        expect(wrapper.find("a.prev").prop("aria-disabled")).toEqual(false);
        expect(wrapper.find("a.next").prop("aria-disabled")).toEqual(true);
    });

    it("disables all buttons on a middle page", async () => {
        const wrapper = mount(
            <MockedProvider mocks={makeMockFor(18)}>
                <Pagination page={3}/>
            </MockedProvider>
        );

        await wait();
        wrapper.update();

        expect(wrapper.find("a.prev").prop("aria-disabled")).toEqual(false);
        expect(wrapper.find("a.next").prop("aria-disabled")).toEqual(false);
    });
});