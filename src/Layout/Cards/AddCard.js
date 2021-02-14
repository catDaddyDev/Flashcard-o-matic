import React, { useState, useEffect } from "react";
import { createCard, readDeck } from "../../utils/api";
import { Link, useParams } from "react-router-dom";

function AddCard() {
  const initialState = { front: "", back: "" };
  const [card, setCard] = useState(initialState);
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

  // adds card data to state object when input changes
  const handleChange = (event) => {
    setCard({...card, [event.target.name]: event.target.value });
  };
  // creates a card with the state object in the api when form submitted
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createCard(deckId, card);
    setCard(initialState);
  };

  // loads deck from api
  useEffect(() => {
    const abortController = new AbortController();
    const loadDeck = async () => {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
    };
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  // displays form to get new card data
  return (
    <div>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item text-primary">
          <Link to="/">
            <i className="bi bi-house-door-fill"></i> Home
          </Link>
        </li>
        <li className="breadcrumb-item text-primary">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Add Card
        </li>
      </ol>
    </nav>
    <h1>{deck.name}: AddCard</h1>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="front">
          <h4>Front</h4>
        </label>
        <textarea
          name="front"
          style={{ resize: "none" }}
          rows="3"
          className="form-control"
          value={card.front}
          placeholder="Front side of card"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="back">
          <h4>Back</h4>
        </label>
        <textarea
          name="back"
          style={{ resize: "none" }}
          rows="3"
          className="form-control"
          value={card.back}
          placeholder="Back side of card"
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <Link to={`/decks/${deckId}`}>
          <button className="btn btn-secondary mr-2">Done</button>
        </Link>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  </div>
  );
}

export default AddCard;
