import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/">
        <h1>Property Search</h1>
      </Link>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/add-property">Add Property</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;
