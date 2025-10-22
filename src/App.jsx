import Header from './Components/Header.jsx';
import Hero from './Components/Hero.jsx';
import About from './Components/About.jsx';
import Stack from './Components/Stack.jsx';
import Projects from './Components/Project/Projects.jsx';
import Contact from './Components/Contact.jsx';
import Footer from './Components/Footer.jsx';


export default function App() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
