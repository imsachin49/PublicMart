import React from "react";
import "./SectionSubtitle.css";

const SectionSubtitle = (props) => {
  return (
    <h1 className="sec-subt">
      <div className="section__subtitle__line"></div>
      <div className="section__subtitle">{props.subtitle}</div>
    </h1>
  );
};

export default SectionSubtitle;
