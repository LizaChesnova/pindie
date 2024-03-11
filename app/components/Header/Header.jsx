'use client';
import { useEffect, useState } from 'react';
import Styles from './Header.module.css'
import { Overlay } from '../Overlay/Overlay';
import { Popup } from '../Popup/Popup';
import { AuthForm } from '../AuthForm/AuthForm';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getJWT, getMe,isResponseOk,removeJWT } from '@/app/api/api-utils';
import { endpoints } from '@/app/api/config';
export const Header = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isPopUpOpened, setIsPopUpOpened] = useState(false);
  const openPopup = () => {
    setIsPopUpOpened(true);
  }
  const closePopup = () => {
    setIsPopUpOpened(false);

  }
  const pathname = usePathname();
  useEffect(()=>{
    const jwt= getJWT()
    if(jwt){
      getMe(endpoints.me,jwt).then((userData)=>{
      if(isResponseOk(userData)){
        setIsAuthorized(true)
      }
    else{
      setIsAuthorized(false)
      removeJWT();
    }})

    }
  })
  const handleLogOut=()=>{
    setIsAuthorized(false)
    removeJWT()
  }
  return (
    <header className={Styles.header}>
      {
        pathname === "/" ?
          <div className={Styles.logo}>
            <img className={Styles.logo__image} src="./images/logo.svg" alt="Логотип Pindie" />
          </div>
          :
          <Link href="/" className={Styles.logo}>
            <img className={Styles.logo__image} src="./images/logo.svg" alt="Логотип Pindie" />
          </Link>
      }

      <nav className={Styles.menu}>
        <ul className={Styles.menu__list}>
          <li className={Styles.menu__item}>
            <Link href="/new" className={`${Styles.menu__link} ${pathname === "/new" ? Styles["menu__link_active"] : ""}`}>Новинки</Link>
          </li>
          <li className={Styles.menu__item}>
            <Link href="/popular" className={`${Styles.menu__link} ${pathname === "/popular" ? Styles["menu__link_active"] : ""}`}>Популярные</Link>
          </li>
          <li className={Styles.menu__item}>
            <Link href="/shooter" className={`${Styles.menu__link} ${pathname === "/shooter" ? Styles["menu__link_active"] : ""}`}>Шутеры</Link>
          </li>
          <li className={Styles.menu__item}>
            <Link href="/runners" className={`${Styles.menu__link} ${pathname === "/runners" ? Styles["menu__link_active"] : ""}`}>Ранеры</Link>
          </li>
          <li className={Styles.menu__item}>
            <Link href="/pixel-games" className={`${Styles.menu__link} ${pathname === "/pixel-games" ? Styles["menu__link_active"] : ""}`}>Пиксельные</Link>
          </li>
          <li className={Styles.menu__item}>
            <Link href="/tds" className={`${Styles.menu__link} ${pathname === "/tds" ? Styles["menu__link_active"] : ""}`}>TDS</Link>
          </li>
        </ul>
        <div className={Styles.auth}>
          {
            isAuthorized ? (<button className={Styles.auth__button}onClick={handleLogOut}>Выйти</button>)
          :
          <button className={Styles.auth__button} onClick={openPopup}>Войти</button>}
        </div>
        <Overlay onCloseClick={closePopup} isOpen={isPopUpOpened} />
        <Popup onCloseClick={closePopup} isOpen={isPopUpOpened} >
          <AuthForm close={closePopup} setAuth={setIsAuthorized}/>
        </Popup>
      </nav>
    </header>
  )
}