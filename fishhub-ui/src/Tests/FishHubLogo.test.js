import React from "react";
import renderer from "react-test-renderer";
import FishHubLogo from "../Components/FishHubLogo";

it("renders correctly", () => {
  const tree = renderer.create(<FishHubLogo></FishHubLogo>).toJSON();
  expect(tree).toMatchSnapshot();
});
