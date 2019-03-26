import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import Item from "../components/Item";

const sampleItem = {
    id: "123fdsfsa",
    title: "Item 1",
    price: 4000,
    description: "This item is really cool",
    image: "dog.jpg",
    largeImage: "dog_big.jpg"
};

describe("<Item/>", () => {
    it("renders and matches the snapshot", () => {
        const wrapper = shallow(<Item item={sampleItem}/>);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});