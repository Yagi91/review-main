export default function Navbar() {
  return (
    <nav className="fixed border-b-2 border-b-white/70 navbar inset-x-0 bg-white/50 backdrop-blur-3xl backdrop-brightness-110 z-10 w-auto">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl font-bold">REVIEWER</a>
      </div>
      <div className="flex-none gap-2 px-4">
        <div>Home</div>
        <div>Reviews</div>
        <div>About Us</div>
        <div></div>
      </div>
    </nav>
  );
}
