import React from "react";

export const Card = (props) => (
  <div className="card" style={{backgroundColor: 'rgba(255,255,255,0.95)'}}>
    <div className="card-header bg-dark" style={{color: '#fff'}}>
      <h5>{props.title}</h5>
    </div>
    <div className="card-body">
      {props.children}
    </div>
  </div>
);
