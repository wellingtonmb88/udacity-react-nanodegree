import React from 'react';
import { shallow, mount } from "enzyme";
import BookshelfChanger from "../BookshelfChanger";

const bookShelfStateChanged = jest.fn();

it("renders without crashing", () => {
    shallow(<BookshelfChanger 
                  shelfState="none"
                  onShelfStateChanged={bookShelfStateChanged}/>);
});

it("testing action onChange", () => {
const wrapper = mount(<BookshelfChanger 
                                    shelfState="none"
                                    onShelfStateChanged={bookShelfStateChanged}/>);
wrapper.find("select").simulate('change', { target: { value : 'Currently Reading'}})
});