import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// Importing SVG icons
import logo from "../assets/logo.svg";
import HomeIcon from "../assets/home-solid.svg";
import AddProductIcon from "../assets/social.svg";
import GetProductsIcon from "../assets/sceduled.svg";
import PowerOffIcon from "../assets/power-off-solid.svg";

const Container = styled.div`
  position: fixed;
  width: 10%; /* Updated width to 10% */
  height: 100%;
  background-color: var(--black);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
`;


const SidebarItem = styled(NavLink)`
  text-decoration: none;
  color: var(--white);
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  border-right: 4px solid transparent;
  transition: all 0.3s ease;

  &.active {
    border-right-color: var(--white);
    background-color: var(--dark-grey);
  }

  &:hover {
    border-right-color: var(--white);
    background-color: var(--dark-grey);
  }

  img {
    width: 1.5rem;
    height: auto;
    margin-right: 1rem;
    filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
      brightness(78%) contrast(85%);
  }

  span {
    display: ${(props) => (props.clicked ? "inline-block" : "none")};
    margin-left: 1rem;
    transition: all 0.3s ease;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin-bottom: 0.5rem;
  }

  h4 {
    font-size: 1rem;
    margin-bottom: 0.25rem;
    color: var(--white);
  }

  a {
    font-size: 0.75rem;
    color: var(--grey);
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: var(--white);
    }
  }
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;

  img {
    width: 1.5rem;
    height: auto;
    filter: invert(15%) sepia(70%) saturate(6573%) hue-rotate(2deg)
      brightness(100%) contrast(126%);
  }

  &:hover {
    opacity: 0.7;
  }
`;

const Sidebar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <Container>
      <img src={logo} alt="Logo" />

      <div>
        <SidebarItem
          onClick={handleClick}
          exact
          activeClassName="active"
          to="/"
        >
          <img src={HomeIcon} alt="Home" />
          <span>Dashboard</span>
        </SidebarItem>
        <SidebarItem
          onClick={handleClick}
          activeClassName="active"
          to="/admin/add-product"
        >
          <img src={AddProductIcon} alt="Add Product" />
          <span>Add Product</span>
        </SidebarItem>
        <SidebarItem
          onClick={handleClick}
          activeClassName="active"
          to="/admin/get-products"
        >
          <img src={GetProductsIcon} alt="Get Products" />
          <span>Get Products</span>
        </SidebarItem>
      </div>

      <ProfileSection>
        <img src="https://picsum.photos/200" alt="Profile" />
        <h4>Jhon Doe</h4>
        <a href="/#">View Profile</a>
        <LogoutButton>
          <img src={PowerOffIcon} alt="Logout" />
        </LogoutButton>
      </ProfileSection>
    </Container>
  );
};

export default Sidebar;
