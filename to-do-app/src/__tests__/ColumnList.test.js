// src/__tests__/ColumnList.test.js
import React from "react";
import { shallow, mount } from "enzyme";
import ColumnList from "../ColumnList";

it("renders without crashing", () => {
  shallow(<ColumnList />);
});

it("executando o If do formulário como false", () => {
    const test = mount(<ColumnList title="Done" />);
    expect(test.find("form").length).toBe(0);
});
  
it("executando o If do formulário como true", () => {
    const test = mount(<ColumnList title="To-Do" />);
    expect(test.find("form").length).toBe(1);
});

it("executando linha 11", () => {
    const addTask = jest.fn();
    const test = mount(
      <ColumnList title="To-Do" addTask={addTask} />
    );
    const form = test.find('form').at(0);
    const children = form.render().children().children();
    form.simulate('submit', { target: { children } });
    expect(addTask).toHaveBeenCalledTimes(1);
});

const lista = [{ id: "123", title: "Item 1", status: "To-Do" }];

it("executando linha 20", () => {
  const test = mount(<ColumnList title="To-Do" items={lista} />);
  expect(test.find("li").length).toBe(1);
});

it("executando linha 23", () => {
    const updateTask = jest.fn();
    const test = mount(
      <ColumnList title="To-Do" items={lista} updateTask={updateTask} />
    );
    test.find("li input").simulate("change");
    expect(updateTask).toHaveBeenCalledTimes(1);
});