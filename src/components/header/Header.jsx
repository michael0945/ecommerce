import classes from "./Header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { BsCart } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import LowerHeaders from "./LowerHeaders";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../utility/firebase";

const Header = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          {/*logo secton*/}
          <div className={classes.logo_container}>
            <Link to="/">
              <img src="" alt="" className="" />
            </Link>
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div className="">
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          {/*search sections*/}
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" />
            <BsSearch size={38} />
          </div>
          {/*other section*/}
          <div className={classes.order_container}>
            <a href="#a" className={classes.language}>
              <img src="" alt="" />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </a>
            <Link to={!user && "/Auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    <span
                      onClick={() => {
                        auth.signOut();
                      }}
                    >
                      Sign Out
                    </span>
                  </>
                ) : (
                  <>
                    <p>helloSign in</p>
                    <span>Account and Lists</span>
                  </>
                )}
              </div>
            </Link>
            <a href="/orders">
              <p>returns</p>
              <span>& orders</span>
            </a>
            <Link to="/cart" className={classes.cart}>
              <BsCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeaders />
    </section>
  );
};

export default Header;
