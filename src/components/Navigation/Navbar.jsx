import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        ROUTE<span>.</span>
      </div>

      <nav>
        <a href="#services">Services</a>
        <a href="#packages">Packages</a>
        <a href="#contact">Contact</a>
      </nav>

      <button className="navButton">
        Start a project →
      </button>
    </header>
  );
}