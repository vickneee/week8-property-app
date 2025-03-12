import {Link} from 'react-router-dom';
import {useContext} from 'react';
import LoadingSpinner from './LoadingSpinner';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const {isAuthenticated, clearUser, username, isLoading} = useContext(AuthContext);
  
  const handleClick = (e) => {
    e.preventDefault();
    clearUser();
  }
  
  if (isLoading) {
    return <LoadingSpinner/>;
  }
  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/">
        <h1>Property Search</h1>
      </Link>
      <div className="links">
        {isAuthenticated && (
          <div>
            <Link className="btn-add-poperty" to="/properties">Add Property</Link>
            {username && <span className="username">{username}</span>}
            <button className="btn" onClick={handleClick}>Log out</button>
          </div>
        )}
        {!isAuthenticated && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
