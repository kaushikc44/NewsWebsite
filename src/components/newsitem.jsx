import { getByTitle } from '@testing-library/react';
import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title, description,imageUrl,newsid} = this.props;
    return (
      <div>
        <div className="card" style={{width:"18rem"}}>
        <img className="card-img-top" src={imageUrl} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a rel="noreferrer" href={newsid} target="_blank" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      </div>
    )
  }
}

export default Newsitem;
