'use client'

import { Preloader } from "../components/Preloader/Preloader";
import { useGetDataByCategory } from "../api/api-hooks";
import { endpoints } from "../api/config";
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
export default  function Pixel() {
  const pixelGames = useGetDataByCategory(endpoints.games, 'pixel');
  return (
    <main className={"main-inner"}>
      {pixelGames ? (<CardsListSection id="pixel" title="Пиксельные игры" data={pixelGames} />) 
      :
        (<Preloader />)
      }
    </main>
  )
}