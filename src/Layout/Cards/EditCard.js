import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateCard, readDeck, readCard } from "../../utils/api/index";

export default function AddCard() {
  const initialState = { front: "", back: "" };
  const [editData, setEditData] = useState(initialState);
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const history = useHistory();
  const { deckId, cardId } = useParams();

  // sets form data to state object
  const handleChange = (event) => {
    setEditData({ ...editData, [event.target.name]: event.target.value });
  };

  // creates card in the api and returns to deck screen
  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard(editData);
    history.push(`/decks/${deckId}`);
  };

  // loads deck and the specific card to edit and stores data in state object
  useEffect(() => {
    const abortController = new AbortController();
    const abortController2 = new AbortController();
    const loadDeck = async () => {
      const responseDeck = await readDeck(deckId, abortController.signal);
      const responseCard = await readCard(cardId, abortController2.signal);
      setDeck(() => responseDeck);
      setCard(() => responseCard);
      setEditData({
        id: cardId,
        front: responseCard.front,
        back: responseCard.back,
        deckId: Number(deckId),
      });
    };
    loadDeck();
    return () => {
      abortController.abort();
      abortController2.abort();
    }
  }, [deckId, cardId]);

  // displays card edit form
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item text-primary">
            <Link to="/">
              <i className='bi bi-house-door-fill'></i>Home
            </Link>
          </li>
          <li className="breadcrumb-item text-primary">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {card.id}
          </li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
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
            value={editData.front}
            placeholder={card.front}
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
            value={editData.back}
            placeholder={card.back}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <Link to={`/decks/${deckId}`}>
            <button className="btn btn-secondary mr-2">Cancel</button>
          </Link>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}