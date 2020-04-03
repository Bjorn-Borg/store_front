import React from "react";
import renderer from "react-test-renderer";
import Index from "../pages/index";
import NewPage from "../pages/newPage";

it("renders homepage unchanged", () => {
  const tree = renderer.create(<Index />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders newPage unchanged", () => {
  const tree = renderer.create(<NewPage />).toJSON();
  expect(tree).toMatchSnapshot();
});
