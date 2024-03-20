'use client'
import { Preloader } from "../components/Preloader/Preloader";
import { endpoints } from "../api/config";
import { useGetDataByCategory } from "../api/api-hooks";
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
export default  function Tds () {
    const tdsGames =  useGetDataByCategory(endpoints.games, 'TDS');
return (
    <main className={"main-inner"}>
      {tdsGames ? (
        <CardsListSection id="TDS" title="TDS" data={tdsGames} />
      ) : (
        <Preloader />
      )}
      
      
    </main>
)
}