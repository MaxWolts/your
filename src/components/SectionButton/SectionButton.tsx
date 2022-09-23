import React from "react";

interface Props {
  setFilterState: React.Dispatch<React.SetStateAction<boolean>>,
  filterState:boolean
}

const SectionButton = ({setFilterState, filterState}:Props) => {

  const changeState = () => {
    if(filterState) {
      setFilterState(false);
    }else {
      setFilterState(true);
    }
  };
  return (
    <div className={`SectionButton ${filterState? 'SectionButton--active': ''}`} onClick={changeState}>
      <button className="SectionButton__inProgress" >
        Pending
      </button>
      <button className="SectionButton__finished">
        Finished
      </button>
    </div>
  );
};

export { SectionButton };
