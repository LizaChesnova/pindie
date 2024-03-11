'use client'
import Styles from "./Games.module.css";
import { useEffect, useState } from "react";
import { getNormalizedGameDataById } from "@/app/api/api-utils";
import { endpoints } from "@/app/api/config";
import { Preloader } from "@/app/components/Preloader/Preloader";
import { isResponseOk } from "@/app/api/api-utils";
import { getJWT, removeJWT, getMe } from "@/app/api/api-utils";
import { checkIfUserVoted } from "@/app/api/api-utils";
import { vote } from "@/app/api/api-utils";
export default function GamePage(props) {
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)
  const [isVoted, setIsVoted] = useState(false);
  const [game, setGame] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const game = await getNormalizedGameDataById(endpoints.games, props.params.id);
      isResponseOk(game) ? setGame(game) : setGame(null);
      setPreloaderVisible(false);
    }
    // Вызываем функцию при первом отображении компонента
    fetchData();
  }, [])
  useEffect(() => {
    const jwt = getJWT()
    if (jwt) {
      getMe(endpoints.me, jwt).then((userData) => {
        if (isResponseOk(userData)) {
          setIsAuthorized(true)
          setCurrentUser(userData)
        }
        else {
          setIsAuthorized(false)
          removeJWT();
        }
      })

    }
  })
  useEffect(() => {
    if (currentUser && game) {
      setIsVoted(checkIfUserVoted(game, currentUser.id));
    } else {
      setIsVoted(false);
    }
  }, [currentUser, game]);
  const handleVote = async () => {
    const jwt = getJWT();
    let usersIdArray = game.users.length
      ? game.users.map((user) => user.id)
      : [];
    usersIdArray.push(currentUser.id);
    const response = await vote(
      `${endpoints.games}/${game.id}`,
      jwt,
      usersIdArray
    );
    if (isResponseOk(response)) {
      setIsVoted(true);
      setGame(() => {
        return {
          ...game,
          users: [...game.users, currentUser],
        };
      });
    }
  };
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
                <button
                  disabled={!isAuthorized || isVoted}
                  className={`button ${Styles["about__vote-button"]}`}
                  onClick={handleVote}
                >
                  {isVoted ? "Голос учтён" : "Голосовать"}
                </button>
              </div>
            </section>
          </>
        )
          : preloaderVisible ? (
            <Preloader />
          ) : (
            <section className={Styles['game']}>
              <p>Такой игры не существует 😢</p>
            </section>
          )

      }

    </main>
  );
}
