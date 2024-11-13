import './App.css';
import { useState } from 'react';

const numberOfRows = 5;
const numberOfCharacters = 18;

// TODO: 
// - [ ] when displaying the character count replace " " with "space" or "blank"
// - [ ] deal with all caps in a consistent way
// - [x] make display nice for sign ouput
// - [x] Make spaces show up as full letters
// - [ ] make display nice on character count
// - [ ] move character count to right hand column
// - [ ] Do character count in a more functional way
// - [ ] Sort character count output alphabetically
// - [ ] Show empty marquee at startup
// - [ ] Centering and justified
// - [ ] 

function eventValue(event) {
  return event.target.value;
}

function App() {
  const [inputText1, setInputText1] = useState("");
  const [inputText2, setInputText2] = useState("");
  const [inputText3, setInputText3] = useState("");
  const [inputText4, setInputText4] = useState("");
  const [inputText5, setInputText5] = useState("");



  function onChange(setter) {
    return function wrappedSetter(event) {
      setter(eventValue(event)); 
    }
  }

  return (
    <div style={{display: "flex", justifyContent: "space-between", paddingRight: "20px"}}>
      <div style={{ marginRight: 40}}>
        <MarqueeText text={inputText1.toUpperCase()} />
        <MarqueeText text={inputText2.toUpperCase()} />
        <MarqueeText text={inputText3.toUpperCase()} />
        <MarqueeText text={inputText4.toUpperCase()} />
        <MarqueeText text={inputText5.toUpperCase()} />

        <div>
          <input type="text" value={inputText1} onChange={onChange(setInputText1)} maxLength={numberOfCharacters}/>
        </div>
        <div>
          <input type="text" value={inputText2} onChange={onChange(setInputText2)} maxLength={numberOfCharacters}/>
        </div>
        <div>
          <input type="text" value={inputText3} onChange={onChange(setInputText3)} maxLength={numberOfCharacters}/>
        </div>
        <div>
          <input type="text" value={inputText4} onChange={onChange(setInputText4)} maxLength={numberOfCharacters}/>
        </div>
        <div>
          <input type="text" value={inputText5} onChange={onChange(setInputText5)} maxLength={numberOfCharacters}/>
        </div>
      </div>

      <div style={{ textAlign: "right" }}>
        <CharacterCounts text={inputText1.toUpperCase()} />
      </div>
    </div>
  );
}

function CharacterCounts({text}) {
  // Take a string and return a list of the characters used in the string
  // and their frequency. The list is a set of pairs of character and count.
  // The characters should be ordered alphabetically.
  // countCharacters :: String -> [{Char, Number}]
  function countCharacters(stringaling) {
    const output = new Map();

    const updateCount = (char) => {
      if (output.has(char)) {
        output.set(char, output.get(char) + 1);
      } else {
        output.set(char, 1);
      }
    }

    for (const char of stringaling) {
      updateCount(char);
    }

    return Array.from(output);
  }

  return (
    countCharacters(text).map((el, index) => (
      <div key={index}>
        <span style={{ fontFamily: "monospace"}}>{el[0]}</span>
        <span style={{ marginLeft: 8, fontFamily: "monospace"}}>{el[1]}</span>
      </div>
    ))
  );
}

const MarqueeText = ({ text, size = 24, style = {} }) => {
  const marqueeStyle = {
    fontFamily: 'Consolas, monospace',
    fontSize: size,
    fontWeight: 'bold',
    textShadow: '2px 2px #000',
    color: '#fff',
    backgroundColor: '#000',
    display: 'inline-block',
    // border: `1px solid white`,
    marginRight: `1px`,
    padding: 8,
    // letterSpacing: `1px`,  // Adjustable letter spacing
    verticalAlign: "top",
    lineHeight: `${size}px`,
    ...style
  };

  const spaceStyle = { ...marqueeStyle, width: `${size}px` };  // Space width

  const charElements = text.split('').map((char, index) => {
    if (char === ' ') {
      return <span key={index} style={spaceStyle}>&nbsp;</span>;
    } else {
      return <span key={index} style={marqueeStyle}>{char}</span>
    }
  });

  return <div>{charElements}</div>;
};

export default App;
