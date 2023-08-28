import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa' // eslint-disable-line no-unused-vars
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice';

function Header() {

  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    dispatch(logout())
    navigate('/');
  }

  return (
    <header className='header'>
      <div className="logo">
        <Link to='/'>Goal Setter</Link>
      </div>
      <ul>
        {user ? <button className='btn' onClick={onClick}><FaSignOutAlt /> Logout</button> : 
        <>
          <li>
            <Link to='/login'><FaSignInAlt /> Login</Link>
          </li>
          <li>
            <Link to='/register'><FaUser /> Register</Link>
          </li>
        </>
        }
      </ul>
    </header>
  )
}

export default Header