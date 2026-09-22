import { useEffect, useRef, useState } from "react";
import "./App.css";

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

const PETAL_COLORS = ["#FBBF24", "#FBBF24", "#F59E0B", "#F07A57", "#FAD4C0"];

const SONG = [
  [67, 0.75], [67, 0.25], [69, 1], [67, 1], [72, 1], [71, 2],
  [67, 0.75], [67, 0.25], [69, 1], [67, 1], [74, 1], [72, 2],
  [67, 0.75], [67, 0.25], [79, 1], [76, 1], [72, 1], [71, 1], [69, 2],
  [77, 0.75], [77, 0.25], [76, 1], [72, 1], [74, 1], [72, 2],
];
const BEAT = 0.52;

function noteFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function playNote(ctx, master, midi, t, dur) {
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.5, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(1.2, dur + 0.4));
  const o1 = ctx.createOscillator();
  o1.type = "sine";
  o1.frequency.value = noteFreq(midi);
  const o2 = ctx.createOscillator();
  o2.type = "sine";
  o2.frequency.value = noteFreq(midi) * 2;
  const g2 = ctx.createGain();
  g2.gain.value = 0.22;
  o1.connect(g);
  o2.connect(g2);
  g2.connect(g);
  g.connect(master);
  const stop = t + Math.max(1.4, dur + 0.6);
  o1.start(t);
  o2.start(t);
  o1.stop(stop);
  o2.stop(stop);
}

function scheduleSong(ctx, master, startAt) {
  let t = startAt;
  SONG.forEach(([midi, beats]) => {
    const dur = beats * BEAT;
    playNote(ctx, master, midi, t, dur);
    t += dur;
  });
  return t - startAt;
}

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
  const [petals, setPetals] = useState([]);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const message = MESSAGES[index];

  const next = () => setIndex((i) => (i + 1) % MESSAGES.length);
  const close = () => setOpen(false);

  const spawnPetal = (gentle = false) => {
    const petal = {
      id: `${Date.now()}-${Math.random()}`,
      left: Math.random() * 100,
      w: gentle ? 8 + Math.random() * 6 : 10 + Math.random() * 8,
      h: gentle ? 13 + Math.random() * 10 : 16 + Math.random() * 12,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      dur: gentle ? 6 + Math.random() * 3 : 3.6 + Math.random() * 2.4,
      delay: gentle ? 0 : Math.random() * 0.9,
      sway: `${(Math.random() * 2 - 1) * (gentle ? 120 : 90)}px`,
      spin: `${(Math.random() * 2 - 1) * 540}deg`,
    };
    setPetals((cur) => [...cur.slice(-24), petal]);
    setTimeout(() => {
      setPetals((cur) => cur.filter((p) => p.id !== petal.id));
    }, (petal.dur + petal.delay) * 1000 + 300);
  };

  const openCard = () => {
    setOpen(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (let i = 0; i < 28; i++) spawnPetal();
  };

  useEffect(() => {
    if (!open) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => spawnPetal(true), 1300);
    return () => clearInterval(id);
  }, [open]);

  const toggleMusic = () => {
    if (playing) {
      const p = audioRef.current;
      if (p) {
        clearTimeout(p.timer);
        p.master.gain.setTargetAtTime(0.0001, p.ctx.currentTime, 0.3);
      }
      setPlaying(false);
      return;
    }
    if (!audioRef.current) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const master = ctx.createGain();
      master.gain.value = 0.0001;
      master.connect(ctx.destination);
      audioRef.current = { ctx, master, timer: null };
    }
    const p = audioRef.current;
    p.ctx.resume();
    p.master.gain.setTargetAtTime(0.16, p.ctx.currentTime, 0.4);
    const loop = () => {
      const dur = scheduleSong(p.ctx, p.master, p.ctx.currentTime + 0.15);
      p.timer = setTimeout(loop, dur * 1000 + 600);
    };
    loop();
    setPlaying(true);
  };

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
            onClick={openCard}
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

      {petals.length > 0 && (
        <div className="confetti-layer" data-testid="petal-confetti-layer" aria-hidden="true">
          {petals.map((p) => (
            <span
              key={p.id}
              className="confetti-petal"
              style={{
                left: `${p.left}%`,
                width: p.w,
                height: p.h,
                background: p.color,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
                "--sway": p.sway,
                "--spin": p.spin,
              }}
            />
          ))}
        </div>
      )}

      <button
        type="button"
        className={playing ? "music-btn music-btn--on" : "music-btn"}
        data-testid="music-toggle-button"
        aria-label={playing ? "Pausar música" : "Tocar música"}
        onClick={toggleMusic}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#F07A57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M11 5 6 9H3v6h3l5 4V5z" fill="#F07A57" stroke="none" />
          {playing ? (
            <>
              <path className="wave" d="M15.5 9.5a4 4 0 0 1 0 5" />
              <path className="wave wave--2" d="M18 7a8 8 0 0 1 0 10" />
            </>
          ) : (
            <>
              <line x1="16" y1="9" x2="21" y2="14" />
              <line x1="21" y1="9" x2="16" y2="14" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
}
