import React, { Fragment, useState } from "react";
import { Route, Switch} from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home/Home";
import NewDeck from "./Home/NewDeck";
import Deck from "./Deck/Deck";
import Study from "./Deck/Study";
import AddCard from "./Cards/AddCard";
import EditCard from "./Cards/EditCard";
import EditDeck from "./Deck/EditDeck";

function Layout() {
  const [deckQty, setDeckQty] = useState(0);
  const updateDecks = (value) => {
    setDeckQty(() => deckQty + value);
  }

  return (
    <Fragment>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact={true} path="/">
            <Home deckQty={deckQty} updateDecks={updateDecks} />
          </Route>
          <Route path="/decks/new">
            <NewDeck />
          </Route>
          <Route path="/decks/:deckId" exact={true}>
            <Deck updateDecks={updateDecks} />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>

      </div>
    </Fragment>
  );
}

export default Layout;
