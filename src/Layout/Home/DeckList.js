import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api";
import { PropTypes } from "prop-types";

function DeckList({ id, name, description, cards, updateDecks }) {
  const history = useHistory();

  // deletes deck after confirmation and returns to home page
  const handleDelete = async () => {
    const toDelete = window.confirm(
      "Delete this deck? \n \n \n You will not be able to recover it."
    );
    if (toDelete) {
      await deleteDeck(id);
      updateDecks(-1);
      history.push("/");
    }
  };
  // displays list of decks with buttons to interact with it
  return (
    <div className="card mb-3">
      <div className="card-body" style={{display: "flex", justifyContent:"space-between"}}>
        <h4 className="card-title">{name}</h4>
        <p>{cards.length} cards</p>
      </div>
      <div className="card-body">
        <p className="card-text">{description}</p>
      </div>
      <div className="px-3" style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <Link to={`/decks/${id}`} className="btn btn-secondary m-2">
            <i className="bi bi-eye-fill"></i>View</Link>
          <Link to={`/decks/${id}/study`} className="btn btn-primary">
            <i className="bi bi-journal-bookmark-fill"></i>Study</Link>
        </div>
        <div>
          <button className="btn btn-danger" onClick={handleDelete}>{" "}<i className="bi bi-trash"></i></button>
        </div>
      </div>
    </div>  
  );
}

DeckList.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  cards: PropTypes.array,
  updateDecks: PropTypes.func,
};

export default DeckList;