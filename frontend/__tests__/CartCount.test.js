import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";

import CartCount from "../components/CartCount";

const count = 10;

describe("<CartCount/>", () => {
    it("renders", () => {
        shallow(<CartCount count={count}/>);
    });

    it("matches the snapshot", () => {
        const wrapper = shallow(<CartCount count={count}/>);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it("updates via props", () => {
        const wrapper = shallow(<CartCount count={50}/>);
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.setProps({ count });

        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});