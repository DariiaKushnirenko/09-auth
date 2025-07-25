import css from "./Header.module.css"
import Link from 'next/link';
import TagsMenu from "../TagsMenu/TagsMenu";
import AuthNavigation from '../AuthNavigation/AuthNavigation';


const Header = async () => {

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">NoteHub</Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li><Link href="/">Home</Link></li>
          <li><TagsMenu /></li>
          <li>
            <Link href="/sign-in">Login</Link>
          </li>
          <li>
            <Link href="/sign-up">Register</Link>
          </li>
             <AuthNavigation /> 
        </ul>
      </nav>
    </header>
  );
};
export default Header;
