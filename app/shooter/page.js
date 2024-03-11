import { getGamesByCategory } from "../data/data-utils";
import { CardsList } from "../components/CardsList/CardsList";
import { getNormalizedGamesDataByCategory } from "../api/api-utils";
import { endpoints } from "../api/config";
export default async function Shooter () {
    const shooterGames = await getNormalizedGamesDataByCategory(endpoints.games, 'shooter');
return (
    <main className={"main-inner"}>
      
      <CardsList id="shooter" title="Шутеры" data={shooterGames} />
      
    </main>
)
}