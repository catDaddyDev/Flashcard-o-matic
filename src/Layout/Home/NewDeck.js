import React, { useState, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";

function NewDeck(){
// empty state object for a new deck
  const initialDeckState = {
    name: "",
    description: "",
  };
  const [newDeckData, setNewDeckData] = useState({initialDeckState});
  const history = useHistory();

  // adds deck data from form to state
  const handleChange = (event) => {
    event.preventDefault();
    setNewDeckData({
      ...newDeckData,
      [event.target.name]: event.target.value,
    });
  };

  // creates deck in api with state object, loads to new deck screen
  async function handleSubmit (event) {
    event.preventDefault();
    const response = await createDeck(newDeckData);
    setNewDeckData({...initialDeckState});
    history.push(`/decks/${response.id}`);
  }

  // displays create deck form
  return (
    <Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      </nav>
      <form onSubmit={handleSubmit}>
        <h1>Create Deck</h1>
        <label htmlFor="name" style={{display:"block"}}>Name</label>   
          <input type="text" 
            id="name" 
            name="name" 
            placeholder="Deck Name" 
            className="form-control" 
            onChange={handleChange}
            style={{width: "100%"}} 
            />                
        <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            name="description" 
            placeholder="Brief description of the deck" className="form-control" 
            onChange={handleChange}
            style={{width: "100%", height: "150px"}}  
            />
        <div className="mt-3">
          <Link to={`/`} className="btn btn-secondary mr-2">Cancel</Link>
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </Fragment>
  )
};

export default NewDeck;