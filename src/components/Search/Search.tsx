import React, { useRef } from "react";

interface Prop {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
}

const Search = ( {setSearchValue}: Prop ) => {
  const inputValue = useRef() as React.MutableRefObject<HTMLInputElement>;

  return (
    <div className="Search">
      <input type="text" className="Search__input" ref= { inputValue } placeholder={"Search item..."}
      />
      <button name="boton de busqueda" className="Search__button" onClick={()=>{inputValue.current.value = ''}} >
        X
      </button>
    </div>
  );
};

export { Search };
