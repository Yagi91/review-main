import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Home from "./components/Home";

export default function App() {
  return (
    <main>
      <section className="container relative mx-auto px-4">
        <Navbar />
      </section>
      <section className="">
        <Home />
      </section>
    </main>
  );
}
