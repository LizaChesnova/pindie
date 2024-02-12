import Styles from "./CardsList.module.css"
import { PopularCardsFragments } from "./PopularcardsFragments"
export const PopularCardslist =()=>{
    return(
        <section className={Styles ["list-section"]}>
        <h2 className={Styles["list-section__title"]} id="popular">
          Популярное
        </h2>
        <ul className={Styles ["cards-list"]}>
          <PopularCardsFragments/>
        </ul>
      </section>
    )
}