import { useState } from "react";
import "@/App.css";

const MESSAGES = [
  {
    salutation: "Mi bebecita hermosa,",
    body: "Eres el sunshine de todo el mundo. Never forget que el mundo brilla más porque tú estás en él. Cuídate mucho, little baby.",
  },
  {
    salutation: "Hola chiquito de mi cielo,",
    body: "Happy Birthday, bebecita. Que este añito te traiga muchas risas, buenos abrazos y todos los sueños that your heart can hold.",
  },
  {
    salutation: "Feliz cumpleaños, bebecita,",
    body: "You are stronger than you know, más linda than any flower, y más brave que cualquier tormenta. Keep shining, chiquita.",
  },
  {
    salutation: "Precious little baby,",
    body: "Cada sonrisa tuya is a gift para el mundo. Never stop being tú misma, pure magia and pure light.",
  },
  {
    salutation: "Mi dulce chiquita,",
    body: "Remember: tú puedes con todo. When the day feels heavy, mándame un mensaje y te recuerdo lo increíble que eres.",
  },
  {
    salutation: "Sweet bebecita,",
    body: "Eres of my favorite people, que Dios te bendiga hoy y siempre con mucha paz, mucha risa y mucha luz.",
  },
  {
    salutation: "Buenos días, little sunshine,",
    body: "Que hoy huelas a girasoles, que rías hasta que te duelan los cachetes, y que sientas mucho, mucho cariño de la gente que te quiere.",
  },
  {
    salutation: "Mi chiquita linda,",
    body: "Eres exactly como una girasol: siempre buscando la luz. Never dim your shine para nadie, bebecita. Sigue así.",
  },
  {
    salutation: "Querida bebecita,",
    body: "Un año más de tu risa en este mundo es un año más de felicidad para all of us que te apreciamos. Feliz cumpleaños, princesita.",
  },
  {
    salutation: "Little baby,",
    body: "You deserve todo lo bonito. Que la vida te dé más regalos que pétalos tiene un girasol: health, laughs y muchas aventuras.",
  },
  {
    salutation: "Mi sol, mi cielo, bebecita,",
    body: "Eres la razón que hace que cada atardecer se vea un poquito más lindo. Happy birthday, chiquita brillante.",
  },
  {
    salutation: "Hola chiquita,",
    body: "Gracias por existir, por reír, y por brillar. Never stop being the beautiful, funny, kind person you are. Enjoy your day!",
  },
  {
    salutation: "Hey little baby,",
    body: "Sé que a veces la vida se pone dura, pero recuerda: tú eres una guerrera with a heart made of sunflower. I believe in you.",
  },
  {
    salutation: "Mi bebecita favorita,",
    body: "Que este cumple sea el comienzo de un año lleno de aventuras, de buena gente, y de mucha, mucha luz. Cheers to you, chiquita.",
  },
];

const SUNFLOWERS = [
  { size: 100, pos: { top: "-20px", left: "-30px" }, delay: "0s", duration: "5.4s" },
  { size: 60, pos: { top: "64px", right: "-16px" }, delay: "0.9s", duration: "4.6s" },
  { size: 45, pos: { top: "33%", left: "-14px" }, delay: "1.7s", duration: "5.9s" },
  { size: 80, pos: { top: "26%", right: "-26px" }, delay: "0.4s", duration: "5s" },
  { size: 55, pos: { bottom: "26%", left: "-12px" }, delay: "2.1s", duration: "4.4s" },
  { size: 90, pos: { bottom: "15%", right: "-28px" }, delay: "1.2s", duration: "5.7s" },
  { size: 50, pos: { bottom: "-14px", left: "14%" }, delay: "2.6s", duration: "4.9s" },
  { size: 70, pos: { bottom: "-20px", right: "12%" }, delay: "0.6s", duration: "5.2s" },
];

function PetalRing({ front }) {
  return Array.from({ length: 12 }).map((_, i) => (
    <div
      key={i}
      className={front ? "petal petal--front" : "petal petal--back"}
      style={{ transform: `rotate(${i * 30 + (front ? 0 : 15)}deg)` }}
    />
  ));
}

function Sunflower({ size, pos, delay, duration }) {
  return (
    <div
      className="sunflower"
      aria-hidden="true"
      style={{ width: size, height: size, animationDelay: delay, animationDuration: duration, ...pos }}
    >
      <PetalRing />
      <PetalRing front />
      <div className="sunflower__center">
        <div className="sunflower__inner" />
      </div>
    </div>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const message = MESSAGES[index];

  const next = () => setIndex((i) => (i + 1) % MESSAGES.length);
  const close = () => setOpen(false);

  return (
    <div className="scene">
      <div className="bg" />
      <div className="scrim" />

      <div className="sunflowers" aria-hidden="true">
        {SUNFLOWERS.map((f, i) => (
          <Sunflower key={i} {...f} />
        ))}
      </div>

      <main className="page">
        <header className="header" data-testid="header">
          <h1 className="header__line1">Feliz Cumpleaños</h1>
          <p className="header__line2">Mayté</p>
          <p className="header__line3">Mi Bebecita ✿</p>
        </header>

        <div className={`stage ${open ? "stage--open" : ""}`}>
          <button
            type="button"
            className="envelope"
            data-testid="envelope-open-button"
            aria-label="Abrir la carta"
            onClick={() => setOpen(true)}
          >
            <span className="envelope__body" />
            <span className="envelope__flap" />
            <span className="envelope__seal">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#FFFFFF" aria-hidden="true">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>
          </button>
          <p className="hint" data-testid="envelope-hint">
            Tócame ✿ Tap me
          </p>
        </div>
      </main>

      {open && (
        <div className="overlay" data-testid="card-overlay">
          <div className="card" role="dialog" aria-modal="true" data-testid="message-card">
            <div className="card__bar" />
            <div className="card__content">
              <div className="card__msg" key={index}>
                <p className="card__salutation" data-testid="card-salutation">
                  {message.salutation}
                </p>
                <p className="card__body" data-testid="card-body">
                  {message.body}
                </p>
              </div>
              <div className="card__dots" data-testid="card-dots">
                {MESSAGES.map((_, i) => (
                  <span key={i} data-testid={`card-dot-${i + 1}`} className={i === index ? "dot dot--active" : "dot"} />
                ))}
              </div>
              <div className="card__actions">
                <button type="button" className="btn btn--secondary" data-testid="card-close-button" onClick={close}>
                  ✕ Cerrar
                </button>
                <button type="button" className="btn btn--primary" data-testid="card-next-button" onClick={next}>
                  Next ✿ →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
