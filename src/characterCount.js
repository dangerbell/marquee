// Take a string and return a list of the characters used in the string
// and their frequency. The list is a set of pairs of character and count.
// The output array orders the characters alphabetically.
// countCharacters :: String -> [{Char, Number}]
function countCharacters(stringaling) {
  // group identical letters together
  // (characters with accents are treat as different characters)
  const grouped = Object.groupBy(stringaling, (a) => a);

  // The character count is the length of the grouped characters
  const pairs = Object.entries(grouped).map(([key, value]) => ([key, value.length]));

  // Turn it into an array ofSort the output alphabetically
  return pairs.toSorted(
    (a, b) => a[0].localeCompare(b[0])
  )
  
}

export default countCharacters;