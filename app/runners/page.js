import { getGamesByCategory } from "../data/data-utils";
import { CardsList } from "../components/CardsList/CardsList";
import { getNormalizedGamesDataByCategory } from "../api/api-utils";
import { endpoints } from "../api/config";
export default async function Runner () {
    const runGames = await getNormalizedGamesDataByCategory(endpoints.games, 'runner');
return (
    <main className={"main-inner"}>
      
      <CardsList id="runner" title="Ранеры" data={runGames} />
      
    </main>
)
}