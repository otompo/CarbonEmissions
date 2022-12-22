import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaBars, FaTimes } from "react-icons/fa";
import Fade from "react-reveal/Fade";
import { AuthContext } from "../context/authContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

const Navbar = ({}) => {
  const router = useRouter();
  const [click, setClick] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [current, setCurrent] = useState("");
  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    window.addEventListener("scroll", changebackground);
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const changebackground = () => {
    if (window.scrollY >= 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  const { isLoading, error, data } = useQuery(["logo"], () =>
    axios.get("/api/website/logo/logo").then((res) => {
      return res.data;
    })
  );

  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <>
          <div
            className={navbar ? "header herderactive  sticky" : "header sticky"}
          >
            <nav className="navbar relative">
              <Fade right>
                <div>
                  <Link href="/" legacyBehavior>
                    {/* <img
                      src={isLoading ? "isLoading" : data?.logoImage?.url}
                      alt="logo"
                      className="pb-1 ant-menu-item"
                      width="30%"
                    /> */}
                    <Image
                      src={isLoading ? "isLoading" : data?.logoImage?.url}
                      alt={data.logo}
                      className="pb-1 ant-menu-item"
                      width={90}
                      height={90}
                      priority
                      quality={80}
                    />
                  </Link>
                </div>
                <span className="c-title">Sahel Green Tech Initiative</span>
              </Fade>

              <div className="hamburger" onClick={handleClick}>
                {click ? (
                  <FaTimes size={30} style={{ color: "#ffffff" }} />
                ) : (
                  <FaBars size={30} style={{ color: "#ffffff" }} />
                )}
              </div>
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li
                  className={
                    router.pathname == "/" ? "active-nav" : "nav-item "
                  }
                >
                  <Link href="/" onClick={closeMenu} legacyBehavior>
                    <a>Home</a>
                  </Link>
                </li>

                {auth?.token ? (
                  <li
                    className={
                      router.pathname == "/user" ? "active-nav" : "nav-item "
                    }
                  >
                    {auth?.token && (
                      <Link
                        href="/admin"
                        className="text-base text-slate-700"
                        legacyBehavior
                      >
                        <a>Dashboard</a>
                      </Link>
                    )}
                  </li>
                ) : (
                  " "
                )}
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
