'use client'


import { Preloader } from "../components/Preloader/Preloader";
import { endpoints } from "../api/config";
import { useGetDataByCategory } from "../api/api-hooks";
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
export default  function Runner () {
    const runGames =  useGetDataByCategory(endpoints.games, 'runner');
return (
    <main className={"main-inner"}>
      {runGames ? (
        <CardsListSection id="runner" title="Ранеры" data={runGames} />
      ) : (
        <Preloader />
      )}
      
    </main>
)
}