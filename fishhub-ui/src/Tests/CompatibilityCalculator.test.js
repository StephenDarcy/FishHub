import React from "react";
import renderer from "react-test-renderer";
import CompatabilityCalculator from "../Components/CompatibilityCalculator";

it("renders correctly", () => {
  const tree = renderer
    .create(<CompatabilityCalculator></CompatabilityCalculator>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
