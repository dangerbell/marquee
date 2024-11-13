import countCharacters from "../characterCount";

it("should count charactes", () => {
  const SAMPLE_STRING = "WIHKWENTOWIN";
  const EXPECTED_OUTPUT = [
    ["E", 1], ["H", 1], ["I", 2], ["K", 1],  ["N", 2], ["O", 1], ["T", 1], ["W", 3], 
  ];

  expect(countCharacters(SAMPLE_STRING)).toEqual(EXPECTED_OUTPUT);
});