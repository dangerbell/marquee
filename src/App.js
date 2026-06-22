import './App.css';
import { useState } from 'react';
import countCharacters from "./characterCount";

const numberOfRows = 5;
const charactersPerRow = 18;

// TODO: 
// - [x] when displaying the character count replace " " with "space" or "blank"
// - [x] make display nice for sign ouput
// - [x] Make spaces show up as full letters
// - [x] move character count to right hand column
// - [x] Do character count in a more functional way
// - [x] Sort character count output alphabetically
// - [x] Show empty marquee at startup
// - [x] Write a test for the character count stuff so I can experiment with other versions
// - [x] Split the character counting code into its own file. Why do people want to bundle things into utils? Just make another file!
// - [x] update node to get "groupBy"
// - [x] Make the spaces be the same size as the letters
// - [x] Centering and justified
// - [ ] deal with all caps in a consistent way
// - [ ] make display nice on character count
// - [ ] Make the column and row size configurable in the UI
// - [ ] See if you can make a single text box that splits into rows for the marquee display
//   - [ ] Figure out a way to get the multiple lines to work nicely without haveing a bunch of copy/paste and state management
//   - [ ] Display it nicer and make the count more prominent
//   - [ ] Make the text box limit the number of rows and characters. The rows/cols props are just box size, not limits.
//   - [ ] Drop the CRLF from the character counts
// - [ ] Double Sided Mode
// - [ ] Clean up the CSS
// - [ ] Deploy it publicly
// - [ ] Put ads on it for passive income


function eventValue(event) {
  return event.target.value;
}

function App() {
  const [inputText1, setInputText1] = useState("");
  const [inputText2, setInputText2] = useState("");
  const [inputText3, setInputText3] = useState("");
  const [inputText4, setInputText4] = useState("");
  const [inputText5, setInputText5] = useState("");

  const [justification, setJustification] = useState("left");

  const [inputText, setInputText] = useState("");

  // const splitStrings = inputText.split(/[\r\n]+/)

  // instead of 5 things, do a single text box and split on crlf.
  // the display will be driven by the number of split rows

  function onChange(setter) {
    return function wrappedSetter(event) {
      setter(eventValue(event)); 
    }
  }

  return (
    <div style={{display: "flex", justifyContent: "space-between", paddingRight: "20px"}}>
      <div style={{ marginRight: 40 }}>
        {/* {splitStrings.map((text, index) => <MarqueeText text={text.toUpperCase()} key={index}/>)} */}
        <MarqueeText text={inputText1.toUpperCase()} justification={justification}/>
        <MarqueeText text={inputText2.toUpperCase()} justification={justification}/>
        <MarqueeText text={inputText3.toUpperCase()} justification={justification}/>
        <MarqueeText text={inputText4.toUpperCase()} justification={justification}/>
        <MarqueeText text={inputText5.toUpperCase()} justification={justification}/>

        {/* <textarea 
          rows={numberOfRows}
          cols={numberOfCharacters}
          value={inputText}
          onChange={onChange(setInputText)}
        /> */}

        <div>
          <input type="text" value={inputText1} onChange={onChange(setInputText1)} maxLength={charactersPerRow}/>
        </div>
        <div>
          <input type="text" value={inputText2} onChange={onChange(setInputText2)} maxLength={charactersPerRow}/>
        </div>
        <div>
          <input type="text" value={inputText3} onChange={onChange(setInputText3)} maxLength={charactersPerRow}/>
        </div>
        <div>
          <input type="text" value={inputText4} onChange={onChange(setInputText4)} maxLength={charactersPerRow}/>
        </div>
        <div>
          <input type="text" value={inputText5} onChange={onChange(setInputText5)} maxLength={charactersPerRow}/>
        </div>

        <div><button onClick={() => setJustification("left")}>Left</button></div>
        <div><button onClick={() => setJustification("centre")}>Centre</button></div>
        <div><button onClick={() => setJustification("right")}>Right</button></div>

      </div>

      <div style={{
        textAlign: "right",
        fontFamily: 'Consolas, monospace',
        fontSize: "24px",
        fontWeight: 'bold',
       }}>
        <CharacterCounts text={(inputText1 + inputText2 + inputText3 + inputText4 + inputText5).toUpperCase()} />
      </div>
    </div>
  );
}

function FrequencyPair({character, count, index}) {
  return (
    <div key={index}>
      <span style={{ fontFamily: "monospace"}}>{character == " " ? "▮" : character}</span>
      <span style={{ marginLeft: 8, fontFamily: "monospace"}}>{count}</span>
    </div>
  )
}

function CharacterCounts({text}) {
  return (
    countCharacters(text).map((el, index) => (
      <FrequencyPair index={index} character={el[0]} count={el[1]} />
    ))
  );
}

const MarqueeText = ({ text, size = 24, justification = "left", style = {} }) => {
  const marqueeStyle = {
    fontFamily: 'Consolas, monospace',
    fontSize: size,
    fontWeight: 'bold',
    textShadow: '2px 2px #000',
    color: '#fff',
    backgroundColor: '#000',
    display: 'inline-block',
    marginRight: `1px`,
    padding: 8,
    verticalAlign: "top",
    lineHeight: `${size}px`,
    ...style
  };
  
  // Pad text based on justification option
  const paddedText = justification == "left" ? leftJustified(text) : justification == "centre" ? centre(text) : rightJustified(text);

  // Split the string into characters to get the right effect
  const charElements = paddedText.split('').map((char, index) => {
    if (char === ' ') {
      return <span key={index} style={marqueeStyle}>&nbsp;</span>;
    } else {
      return <span key={index} style={marqueeStyle}>{char}</span>
    }
  });

  return <div>{charElements}</div>;

  function leftJustified(text) {
    return text.concat( ' '.repeat(charactersPerRow - text.length) );
  }

  function rightJustified(text) {
    return ' '.repeat(charactersPerRow - text.length).concat( text );
  }

  function centre(text) {
    const front = ' '.repeat(Math.floor((charactersPerRow - text.length) / 2));
    const back = ' '.repeat(charactersPerRow - (front.length + text.length));
    return front.concat(text).concat(back);
  }
};

export default App;
