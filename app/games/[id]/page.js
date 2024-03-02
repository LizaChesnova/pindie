import Styles from "./Games.module.css";
import {getGamesById} from "../../data/data-utils.js";

export default function GamePage(props) {
    const id = props.params.id;
    console.log(id);
    const game = getGamesById(id);
  return (
    <main className="main">

      {
    game ? (
        <>
          <section className={Styles['game']}>
            <iframe className={Styles['game__iframe']} src={game.link}></iframe>
          </section>
          <section className={Styles['about']}>
            <h2 className={Styles['about__title']}>{game.title}</h2>
            <div className={Styles['about__content']}>
              <p className={Styles["about__description"]}>{game.description}</p>
              <div className={Styles["about__author"]}>
                <p>Автор: <span className={Styles["about__accent"]}>{game.developer}</span></p>
              </div>
            </div>
            <div className={Styles["about__vote"]}>
              <p className={Styles["about__vote-amount"]}>За игру уже проголосовали: <span className={Styles["about__accent"]}>{game.users.length}</span></p>
              <button  className={`button ${Styles["about__vote-button"]}`}>Голосовать</button>
            </div>
          </section>
        </>
    ) : (
        <section className={Styles['game']}>
            <p>Такой игры не существует 😢</p>
        </section>
    )
}
    </main>
  );
}
