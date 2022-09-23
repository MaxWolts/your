import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const Structure = ({children}: Props) => {
  return( 
  <div className="Structure">
    {children}
  </div> )
}

export { Structure }