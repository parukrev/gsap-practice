import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const App = () => {
  const container = useRef();
  const containRed = useRef();
  const toggle = useRef();

  const { contextSafe } = useGSAP(
    () => {
      toggle.current = gsap.timeline({ paused: true }).to("#box", {
        x: 100,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "power2.inOut",
      });
    },
    { scope: containRed }
  );

  // GSAP
  useGSAP(
    () => {
      gsap.to("#box", {
        x: 300,
        yoyo: true,
        repeat: -1,
        duration: 1,
        ease: "power2.inOut",
      });
    },
    { scope: container }
  );

  // GSAP berfungsi hanya pada div dengan id box yang berada dalam scope ref container yaitu yang berwarna biru, meskipun ada div sama dengan id box tapi karena diluar dari scope container maka tidak akan bekerja

  // toggle handler
  const toggleHandler = contextSafe(() => {
    toggle.current.isActive() ? toggle.current.pause() : toggle.current.play();
  });

  // Pertama buat hook nya dulu & set false
  const [isOpen, setIsOpen] = useState(false);
  const menuBox = useRef();

  useGSAP(() => {
    gsap.to("#menu", {
      height: 0,
    });
  }, [isOpen]);

  // Toggle handler
  const toggleMenu = () => {
    setIsOpen((isOpen) => !isOpen); // karena set awal itu false, di reverse jadi true
  };

  return (
    <div>
      <div ref={container}>
        <div id="box" className="w-28 h-28 bg-blue-600 mt-5 ml-5" />
      </div>
      <div ref={containRed}>
        <div id="box" className="w-28 h-28 bg-red-600 mt-5 ml-5" />
      </div>
      <div className="mt-5 mx-auto w-max">
        <button
          onClick={toggleHandler}
          className="bg-green-600 font-medium text-white py-2 px-3 rounded-full leading-none"
        >
          Toggle
        </button>
      </div>
      <div className="mt-5 mb-96 mx-auto w-max">
        <button
          onClick={toggleMenu}
          className="bg-blue-600 text-white p-2 rounded"
        >
          {isOpen ? "Close" : "Menu"}
        </button>
        {isOpen && (
          <div ref={menuBox}>
            <ul id="menu" className="p-4 space-y-2 bg-black text-white mt-10">
              <li>Home</li>
              <li>About</li>
              <li>Services</li>
              <li>Contact</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
