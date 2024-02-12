

import { Banner } from "./components/Banner/Banner";
import { Promo } from "./components/Promo/Promo";
import { PopularCardslist } from "./components/CardsList/PopularCardsList";
import { NewCardsList } from "./components/CardsList/NewCardsList";

export default function Home() {
  return (
    <main className="main">
      <Banner/>
      <PopularCardslist/>
      <NewCardsList/>
      <Promo/>
    </main>
  );
}
