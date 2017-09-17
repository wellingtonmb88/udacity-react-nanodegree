import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { shallow, mount } from "enzyme";

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });
it("renders without crashing", () => {
  shallow(<App />);
});

it("adiciona uma tarefa", () => {
  const test = mount(<App />);
  expect(test.state().items.length).toBe(0);
  test.find("form input").node.value = "Nova tarefa";
  test.find("form button").node.click();
  expect(test.state().items.length).toBe(1);
});
