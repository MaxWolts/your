import React from "react";
import { Category } from "../types";
interface Props {
  sectionName: Category
}

const Title = ({sectionName}: Props) => {
  return(
  <div className="Title">
    <div className="Title__your">
        <h1>Your </h1>
    </div>
    <h1 className="Title__name"> { sectionName }s</h1>
  </div> )
}

export { Title }
