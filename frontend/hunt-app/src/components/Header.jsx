import '../styles/Header.css';
import React from 'react'
import deerImg from '../assets/deer.png'
import Button from '@mui/material/Button';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersonIcon from '@mui/icons-material/Person';
import { NavLink,useNavigate } from 'react-router-dom'
import NewspaperIcon from '@mui/icons-material/Newspaper';

export default function Header() {

  return (
    <>
      <div className="container">
        <div className="first-row">
          <div className="logo-container">
            <img src={deerImg} width="80px" height="70px" alt="" />
            <p>BELGOSOHOTA</p>
          </div>
          <Button
            variant="outlined"
            sx={{
              height: '40px',
              color: '#000000',
              borderColor: '#000000',
              fontWeight: 'bold',
            }}
          >
            <NavLink to={'/registration'} sx={{color: '#000000'}}>Войти</NavLink>
          </Button>
        </div>
        <nav className="nav-menu">
          <ul>
            <li>
              <NavLink to={'/permissions_to_buy'}>
                <FormatListBulletedIcon sx={{color: '#000000'}}/>
                <p>Путевки на охоту</p>
              </NavLink>              
            </li>
            <li>
              <NavLink to={'/news'} style={{ 
                display: 'flex', 
                flexDirection:'column',
                justifyContent: 'center', 
                alignItems: 'center' 
              }}>
                <NewspaperIcon sx={{color: '#000000'}}/>
                <p>Новости</p>
              </NavLink>              
            </li>
            <li>
              <NavLink to={'/hunter/profile'}>
                <PersonIcon sx={{color: '#000000'}}/>
                <p>Личный кабинет</p>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
