'use client'

import { getGamesByCategory } from "./data/data-utils";
import { Banner } from "./components/Banner/Banner";
import { Promo } from "./components/Promo/Promo";
import { getData } from "./api/api-utils";
import { CardsList } from "./components/CardsList/CardsList";



export default async function Home() {
  const popularGames = getGamesByCategory("popular");
  const newGames = getGamesByCategory("new");
  return (

    <main className="main">
      <Banner />
      <CardsList id="popular" title="Популярные" data={popularGames} />
      <CardsList id="new" title="Новинки" data={newGames} />
      <Promo />
    </main>
  );
}
