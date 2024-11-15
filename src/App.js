import React, { useState, useCallback, useEffect, useRef } from 'react';
import './index.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-={}[]|:;";

    // Replace 'array.length' with 'length' to control the length of the password generated
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordClipBoard = useCallback(()=>{
passwordRef.current?.select()
passwordRef.current?.setSelectionRange(0,100)
window.navigator.clipboard.writeText(password)
console.log(password)
  },[password]);

  useEffect(()=>{
    passwordGenrator()
  },[length, numberAllowed,charAllowed,passwordGenrator])


  return (
    <div className="center-container">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-5 my-8 text-orange-500 bg-gray-700">
        <h1 className='text-white text-center my-3'>
          Password Genrator
        </h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button 
          onClick={copyPasswordClipBoard}
          className='outline-none bg-blue-700 text-white px-3
           py-0 shrink-0'>
            Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex text-center gap-x-1'>
            <input type='range'
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>length:{length}</label>
          </div>
          <div className='flex text-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex text-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={charAllowed}
              id='charactorInput'
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor='charactorInput'>Charactors</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
