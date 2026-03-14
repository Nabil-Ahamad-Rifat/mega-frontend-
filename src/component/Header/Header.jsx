import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Logo, Logoutbtn } from "../index";
import { Service } from "./../../appWrite/configAp";
import { useSelector } from "react-redux";
import Container from "./../../container/Container";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigator = useNavigate();
  const navItems = [
    {
      name: "home",
      slug: "/",
      active: true,
    },
    {
      name: "login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "all Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "add post",
      slug: "/add-post",
      active: authStatus,
    },
    { name: "profile", slug: "/profile", active: authStatus },
  ];
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex items-center mx-auto justify-center">
          <div className="mr-4">
            <Link to="/">
              <Logo width="100px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((navItem) =>
              navItem.active ? (
                <li key={navItem.name}>
                  <button
                    onClick={() => navigator(navItem.slug)}
                    className="inline-block px-6 py-2 duration-500 hover:bg-blue-100 rounded-full capitalize"
                  >
                    {navItem.name}
                  </button>
                </li>
              ) : null,
            )}
            {authStatus && (
              <li>
                <Logoutbtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
