import Styles from "./CardsList.module.css"
import { NewCardsFragments } from "./NewCardsFragments"

export const NewCardsList =()=> {
    return (
        <section className={Styles ["list-section"]}>
        <h2 className={Styles["list-section__title"]} id="new">
          Новинки
        </h2>
        <ul className={Styles ["cards-list"]}>
          <NewCardsFragments/>
        </ul>
      </section>
    )
}