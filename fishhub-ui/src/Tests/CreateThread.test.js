import React from "react";
import renderer from "react-test-renderer";
import CreateThread from "../Components/CreateThread";

it("renders correctly", () => {
  const tree = renderer.create(<CreateThread></CreateThread>).toJSON();
  expect(tree).toMatchSnapshot();
});
