import React from "react";
import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #20b169; 
  padding: 20px;
`;

const HeaderLink = styled(Link) <{ active?: boolean }>`
  text-decoration: none;
  color: ${props => props.active ? '#ffffff' : '#000000'};
  font-weight: 600;
`;

const Header: React.FC = () => {
  const location = useLocation();
  const isMusicActive = location.pathname === "/";
  const isStatisticsActive = location.pathname === "/Satatstics";

  return (
    <HeaderContainer>
      <HeaderLink active={isMusicActive} to="/">List of Music</HeaderLink>
      <HeaderLink active={isStatisticsActive} to="/Satatstics">Statistics</HeaderLink>
    </HeaderContainer>
  );
};

export default Header;
