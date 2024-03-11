import { getGamesByCategory } from "../data/data-utils";
import { CardsList } from "../components/CardsList/CardsList";
import { getNormalizedGamesDataByCategory } from "../api/api-utils";
import { endpoints } from "../api/config";
export default async function Pixel () {
    const pixelGames = await getNormalizedGamesDataByCategory(endpoints.games, 'pixel');
return (
    <main className={"main-inner"}>
      
      <CardsList id="pixel" title="Пиксельные игры" data={pixelGames} />
      
    </main>
)
}