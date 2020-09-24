import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon } from 'antd';
import Link from 'next/link'
import Router from 'next/router';
import { Input } from 'antd'

const LogoContainer = styled.div`
  margin-left: 40px;
`

const Title = styled.div`
  margin-left: 10px;
  h1 { 
    color: white; 
    margin: 0;
  }
`

const NavWrapper = styled.nav`
  align-items: center;
  display: flex;
  background-color: #3c4449;
  overflow: hidden;
  justify-content: space-between;
  height: 70px;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
`

const ListContainer = styled.ul`
  display: flex;
  float: right;
  a {
    color: white;
  }
  li {
    color: white;
    cursor: pointer;
    margin-right: 20px;
    float: right;
  }
  li:hover{
    color: #28a7df;
  }
`
const SearchContainer = styled.div`
  width: 30%;
  margin: 20px 0;
`
const Search = styled(Input.Search)`
  input { 
    background-color: #3c4549;
    color: white;
  }
  button {
    background-color: #4a565c !important;
    border-color: white !important;
  }
`

const TopNav = ({ logo, title }) => {
  const onSearch = (value) => {
    Router.push({ pathname: '/hashtag', query: { tag: value } }, `/hashtag/${value}`);
  };

  return (
    <NavWrapper>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <LogoContainer>{logo}</LogoContainer>
        <Title>{title}</Title>
      </div>
      <SearchContainer>
        <Search enterButton style={{ verticalAlign: 'middle' }} onSearch={onSearch} placeholder='Search'/>
      </SearchContainer>
      <ListContainer>
        <li><Link href='/'><a><Icon type='home' style={{ fontSize: '2rem'}}/></a></Link></li>
        <li><Link href='/'><a><Icon type='number' style={{ fontSize: '2rem'}}/></a></Link></li>
        <li><Link href='/about'><a><Icon type='heart' style={{ fontSize: '2rem'}}/></a></Link></li>
        <li><Link href='/profile'><a><Icon type='user' style={{ fontSize: '2rem'}}/></a></Link></li>
        <li><Link href='/'><a><Icon type='setting' style={{ fontSize: '2rem'}}/></a></Link></li>
      </ListContainer>
    </NavWrapper>
  )
}

TopNav.propTypes = {

}

export default TopNav
