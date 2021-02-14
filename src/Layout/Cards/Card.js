import React from "react";
import { deleteCard } from "../../utils/api/index";
import { Link, useRouteMatch } from "react-router-dom";
import { PropTypes } from "prop-types";

export default function Card({ id, front, back, updateCards }) {
  const { url } = useRouteMatch();

  // prompts user about card deletion and deletes on confirmation
  const handleDelete = async () => {
    const toDelete = window.confirm(
      "Delete this card? \n \n \n You will not be able to recover it."
    );
    if (toDelete) {
      await deleteCard(id);
      updateCards(-1); //to re-render the card list on the deck page
    }
  };

  // displays card with edit and delete button
  return (
    <div>
      <div className="card mb-2" style={{ width: "100%" }}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <p className="card-text w-50">{front}</p>
            <p className="card-text w-50">{back}</p>
          </div>
          <div className="d-flex justify-content-end">
            <Link to={`${url}/cards/${id}/edit`}>
              <button className="btn btn-secondary mr-2">
                <i className='bi bi-pencil-fill'></i> Edit
              </button>
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              <i className='bi bi-trash'></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number,
  front: PropTypes.string,
  back: PropTypes.string,
  updateCards: PropTypes.func,
};