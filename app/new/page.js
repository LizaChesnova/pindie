
import { CardsList } from "../components/CardsList/CardsList";
import { getNormalizedGamesDataByCategory } from "../api/api-utils";
import { endpoints } from "../api/config";
export default async function New () {
    const newGames = await getNormalizedGamesDataByCategory(endpoints.games, 'new');
return (
    <main className={"main-inner"}>
      
      <CardsList id="new" title="Новинки" data={newGames} />
      
    </main>
)
}