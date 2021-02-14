import React, { useState, useEffect } from "react";
import DeckList from "./DeckList";
import { listDecks } from "../../utils/api";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

function Home({ deckQty, updateDecks }) {
  // default empty state array for decks
  const [decks, setDecks] = useState([]);

  // load decks from api
  useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
      const response = await listDecks(abortController.signal);
      setDecks(response);
    };
    loadDecks();
    return () => abortController.abort();
  }, [deckQty]);

  // display create button and list of decks
  return (
    <div className="NotFound">
      <Link to="/decks/new">
        <button className="btn btn-secondary mb-2">
          <i className="bi bi-plus"></i>Create Deck
        </button>
      </Link>
      {decks.map(({ id , name, description, cards }) => (
        <DeckList 
          key={id}
          id={id}
          description={description}
          cards={cards}
          name={name}
          updateDecks={updateDecks}
        />
      ))}
    </div>
  );
}

Home.propTypes = {
  deckQty: PropTypes.number,
  updateDecks: PropTypes.func,
};

export default Home;