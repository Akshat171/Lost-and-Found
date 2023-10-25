import {
  faHome,
  faTicket,
  faUser,
  fawp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-6">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
        <Link href="/TicketPage/new">
          <FontAwesomeIcon icon={faTicket} className="icon" />
        </Link>
      </div>
      <div>
        <h2 className="text-default-text ">LOST & FOUND</h2>
      </div>
      <div className="items-center mt-2 mr-2">
        <FontAwesomeIcon href="/login" icon={faUser} className="icon" />
      </div>
    </nav>
  );
};

export default Nav;
