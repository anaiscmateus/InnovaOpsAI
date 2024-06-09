// App.jsx
import Bot from "./components/Bot";
import Header from "./components/Header";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow px-6 pt-8 pb-12" role="main">
        <About />
        <Bot />
      </main>
      <Footer />
    </div>
  );
}

export default App;
