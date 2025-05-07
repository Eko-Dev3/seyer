"use client";

import { useState, useEffect } from "react";
import { title, subtitle } from "@/components/primitives";


import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';


const images = [
  "/polaroid1.jpg",
  "/polaroid2.jpg",
  "/polaroid3.jpg",
  "/polaroid4.jpg",
  "/polaroid5.jpg"
];

// Lista de nombres disponibles
const names = ["Pau", "Paula", "Paulina", "Seyer", "Reyes"];

export default function Home() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(null);
  const [showResults, setShowResults] = useState(false);



  

  const [quizAnswers, setQuizAnswers] = useState(() => {
    const stored = localStorage.getItem("quizAnswers");
    return stored
      ? JSON.parse(stored)
      : {
          age: "",
          qualities: "",
          skills: "",
          firstSeen: "",
          reason: "",
          music: "",
        };
  });
  
  const [feedback, setFeedback] = useState({
    age: "",
    qualities: "",
    skills: "",
    music: "",
  });
  
  const correctAnswers = {
    age: "26",
    qualities: "Que tenga honestidad, respeto, ganas de querer hacer cosas y valentía.",
    skills: "Que sepa bailar, cantar, dibujar, leer o escribir.",
    music: "AfroPop, Rap español, música antigua de Guinea Ecuatorial, Amapiano, Pop en inglés y latino.",
  };
  

 
  

  const isStep5Valid = () => {
    return quizAnswers.age && quizAnswers.qualities && quizAnswers.skills;
  };
  
  const isStep6Valid = () => {
    return quizAnswers.firstSeen && quizAnswers.reason && quizAnswers.music;
  };

  

  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);
  

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const savedConfirmed = localStorage.getItem("confirmed");
    const savedName = localStorage.getItem("name");

    if (savedConfirmed === "true") {
      setConfirmed(true);
      setStep(savedName ? 3 : 1); // Si ya tiene nombre, ir al paso 3
    }

    if (savedName) {
      setName(savedName);
    }
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center">
        {step === 0 && (
          <>
            <h1 className={title()}>¿Eres Pau? 🤔</h1>
            <div className="flex justify-center gap-4 mt-6">
              <button
                className="px-4 py-2 text-white bg-green-500 rounded-full"
                onClick={() => {
                  localStorage.setItem("confirmed", "true");
                  setConfirmed(true);
                  setStep(1);
                }}
              >
                Sí ✨
              </button>
              <button
                className="px-4 py-2 border rounded-full"
                onClick={() => setStep(2)}
              >
                No 🙈
              </button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h1 className={title({ color: "violet" })}>
              ¡Sabía que eras tú, Srta. Pau ♥️!
            </h1>
            <div className={subtitle({ class: "mt-4" })}>
              Elige cómo quieres que te llame hoy:
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {names.map((n) => (
                <button
                  key={n}
                  className={`px-4 py-2 border rounded-full ${
                    name === n ? "bg-violet-100" : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setName(n);
                    localStorage.setItem("name", n);
                    setStep(3);
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className={title({ color: "red" })}>
              Ups, entonces no deberías estar aquí... ¿o sí? 🚪
            </h1>
            <div className={subtitle({ class: "mt-4" })}>
              Bueno, ya que llegaste… quédate, quizás te sorprendes. 😉
            </div>
          </>
        )}

        {step === 3 && name && (
          <>
            <h1 className={title()}>Hey {name} 👋</h1>
            <div className={subtitle({ class: "mt-4" })}>
              Estoy muy feliz de que estés aquí. Esta pequeña web es un detalle
              pensado especialmente para ti. Poco a poco irás descubriendo
              cosas bonitas, dulces y únicas... como tú. ✨
            </div>
            <button
              className="px-4 py-2 mt-6 text-white bg-blue-500 rounded-full"
              onClick={() => setStep(4)}
            >
              ¡Vamos! 💫
            </button>
          </>
        )}


{step === 4 && (
  <>
    <h1 className={title({ color: "pink" })}>
      Esto... es solo un gesto bonito 🎁
    </h1>
    <div className={subtitle({ class: "mt-4 text-left" })}>
      Hey, solo quería recordarte que <strong>estoy aquí</strong>...  
      no es una declaración, ni una obligación.  
      Es solo un pequeño gesto de cariño sincero.  
      <br /><br />
      Por eso pensé en regalarte <strong>fotos estilo Polaroid</strong> —  
      momentos tuyos, capturados con ternura y admiración.  
      <br /><br />
      Mi idea es que cada vez que nos veamos, pueda darte una nueva foto.  
      Y que puedas guardarlas como recuerdos especiales... en un álbum, o decorando tu espacio.  
      <br /><br />
      Así me gustaría que se vea algún día:
    </div>

    <div className="grid grid-cols-2 gap-4 mt-6">
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Decoración ${idx + 1}`}
          className="transition-transform shadow-lg cursor-pointer rounded-xl hover:scale-105"
          onClick={() => setPhotoIndex(idx)}
        />
      ))}
    </div>

    {photoIndex !== null && (
      <Lightbox
        mainSrc={images[photoIndex]}
        nextSrc={images[(photoIndex + 1) % images.length]}
        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
        onCloseRequest={() => setPhotoIndex(null)}
        onMovePrevRequest={() =>
          setPhotoIndex((photoIndex + images.length - 1) % images.length)
        }
        onMoveNextRequest={() =>
          setPhotoIndex((photoIndex + 1) % images.length)
        }
      />
    )}

    <div className={subtitle({ class: "mt-6" })}>
      Te prometo hacer todo lo posible para regalarte una nueva fotito cada vez que nos veamos 💌  
    </div>

    <button
      className="px-4 py-2 mt-6 text-white bg-indigo-600 rounded-full"
      onClick={() => setStep(5)}
    >
      ¿Te gustaría saber más de mí? 💭
    </button>
  </>
)}


{step === 5 && (
  <div className="mt-10">
    <h1 className={title({ color: "pink" })}>Un pequeño quiz sobre mí 🎯</h1>
    <p className={subtitle({ class: "mt-2 text-left" })}>
      ¿Qué tanto crees conocerme? Intenta adivinar estas cosas sobre mí.
    </p>

    <div className="mt-8 space-y-6">
      {/* Edad */}
      <div>
        <h3 className="text-lg font-semibold">¿Qué edad tengo?</h3>
        <div className="flex flex-col mt-3 space-y-2">
          {["24", "25", "26", "27"].map((option, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                name="age"
                value={option}
                
                onChange={(e) => {
                  const value = e.target.value;
                  const updated = { ...quizAnswers, age: value };
                  setQuizAnswers(updated);
                  localStorage.setItem("quizAnswers", JSON.stringify(updated));
                 
                }}
              />
              <span>{option}</span>
            </label>
          ))}
          {quizAnswers.age && (
            <p className="mt-1 text-sm text-gray-600">{feedback.age}</p>
          )}
        </div>
      </div>

      {/* Cualidades */}
      <div>
        <h3 className="text-lg font-semibold">¿Qué cualidad valoro más en una chica?</h3>
        <div className="flex flex-col mt-3 space-y-2">
          {[
            "Que tenga honestidad, respeto, ganas de querer hacer cosas y valentía.",
            "Que tenga mucho dinero y un alto estatus social.",
            "Que sea físicamente muy atractiva, como de revista.",
            "Que tenga miles de seguidores en redes sociales.",
          ].map((option, index) => (
            <label key={index} className="flex items-start space-x-2">
              <input
                type="radio"
                name="qualities"
                value={option}
               
                onChange={(e) => {
                  const value = e.target.value;
                  const updated = { ...quizAnswers, qualities: value };
                  setQuizAnswers(updated);
                  localStorage.setItem("quizAnswers", JSON.stringify(updated));
                  
                }}
              />
              <span>{option}</span>
            </label>
          ))}
          {quizAnswers.qualities && (
            <p className="mt-1 text-sm text-gray-600">{feedback.qualities}</p>
          )}
        </div>
      </div>

      {/* Habilidad o hobby */}
      <div>
        <h3 className="text-lg font-semibold">¿Qué habilidad me parece más atractiva en una chica?</h3>
        <div className="flex flex-col mt-3 space-y-2">
          {[
            "Que sepa bailar, cantar, dibujar, leer o escribir.",
            "Que sea muy buena en matemáticas o finanzas.",
            "Que sea experta en videojuegos competitivos.",
            "Que domine al 100% las redes sociales y tenga buen feed.",
          ].map((option, index) => (
            <label key={index} className="flex items-start space-x-2">
              <input
                type="radio"
                name="skills"
                value={option}
               
                onChange={(e) => {
                  const value = e.target.value;
                  const updated = { ...quizAnswers, skills: value };
                  setQuizAnswers(updated);
                  localStorage.setItem("quizAnswers", JSON.stringify(updated));
                 
                }}
              />
              <span>{option}</span>
            </label>
          ))}
          {quizAnswers.skills && (
            <p className="mt-1 text-sm text-gray-600">{feedback.skills}</p>
          )}
        </div>
      </div>
    </div>

    {isStep5Valid() && (
      <div className="mt-8">
        <button
          className="p-2 bg-red-600 rounded"
          onClick={() => {
            setStep(step + 1);
            localStorage.setItem("step", (step + 1).toString());
          }}
        >
          Continuar
        </button>
      </div>
    )}
    
  </div>
)}


{step === 6 && (
  <div className="mt-10">
    <h1 className={title({ color: "pink" })}>Seguimos con el quiz 👀</h1>
    <p className={subtitle({ class: "mt-2 text-left" })}>
      Unas cuantas más... ¡ya casi acabas!
    </p>

    <div className="mt-8 space-y-6">
      {/* ¿Dónde crees que te vi por primera vez? */}
      <div>
        <h3 className="text-lg font-semibold">¿Dónde crees que te vi por primera vez?</h3>
        <div className="flex flex-col mt-3 space-y-2">
          {[
            "En una red social mientras veía historias.",
            "En persona, aunque tú no te diste cuenta.",
            "Por una foto que alguien me enseñó.",
            "Nunca te vi, solo escuché hablar de ti.",
          ].map((option, index) => (
            <label key={index} className="flex items-start space-x-2">
              <input
                type="radio"
                name="firstSeen"
                value={option}
               
                onChange={(e) => {
                  const value = e.target.value;
                  const updated = { ...quizAnswers, firstSeen: value };
                  setQuizAnswers(updated);
                  localStorage.setItem("quizAnswers", JSON.stringify(updated));
                  
                  
                }}
              />
              <span>{option}</span>
            </label>
          ))}
          {quizAnswers.firstSeen && (
            <p className="mt-1 text-sm text-gray-600">{feedback.firstSeen}</p>
          )}
        </div>
      </div>

      {/* ¿Por qué crees que hice eso para ti? */}
      <div>
        <h3 className="text-lg font-semibold">¿Por qué crees que hice eso para ti?</h3>
        <div className="flex flex-col mt-3 space-y-2">
          {[
            
            "Solo quería ver tu reacción.",
            "Lo hice sin pensarlo mucho.",
            "Porque me interesas genuinamente.",
            "Estaba aburrido y salió así.",
          ].map((option, index) => (
            <label key={index} className="flex items-start space-x-2">
              <input
                required
                type="radio"
                name="reason"
                value={option}
                
                onChange={(e) => {
                  const value = e.target.value;
                  const updated = { ...quizAnswers, reason: value };
                  setQuizAnswers(updated);
                  localStorage.setItem("quizAnswers", JSON.stringify(updated));
                }}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ¿Qué tipo de música me gusta? */}
      <div>
        <h3 className="text-lg font-semibold">¿Qué tipo de música me gusta?</h3>
        <div className="flex flex-col mt-3 space-y-2">
          {[
            "AfroPop, Rap español, música antigua de Guinea Ecuatorial, Amapiano, Pop en inglés y latino.",
            "Solo escucho trap o drill, todo lo demás me da igual.",
            "Reguetón y bachata, nada más.",
            "Música clásica o instrumental casi siempre.",
          ].map((option, index) => (
            <label key={index} className="flex items-start space-x-2">
              <input
                type="radio"
                name="music"
                value={option}
                required
                onChange={(e) => {
                  const value = e.target.value;
                  const updated = { ...quizAnswers, music: value };
                  setQuizAnswers(updated);
                  localStorage.setItem("quizAnswers", JSON.stringify(updated));
                 
                }}
              />
              <span>{option}</span>
            </label>
          ))}
          {quizAnswers.music && (
            <p className="mt-1 text-sm text-gray-600">{feedback.music}</p>
          )}
        </div>
      </div>
    </div>

    {/* Botón para continuar */}
    {isStep6Valid() && (
      <div className="mt-8">
        <button
           className="p-2 bg-red-600 rounded"
          onClick={() => {
            setStep(step + 1);
            localStorage.setItem("step", (step + 1).toString());
          }}
        >
         Finalizar
        </button>
      </div>
    )}
  </div>
)}



{step === 7 && (
  <div className="mt-10">
    <h1 className={title({ color: "pink" })}>¿Cuántas crees que acertaste? 🤔</h1>
    <p className={subtitle({ class: "mt-2 text-left" })}>
      Haz clic en el botón de abajo para ver cuáles acertaste y una pequeña explicación.
    </p>

    <div className="mt-6">
      <button
        className="px-4 py-2 text-white transition bg-red-600 rounded hover:bg-violet-700"
        onClick={() => setShowResults(true)}
      >
        Ver respuestas correctas
      </button>
    </div>

    {showResults && (
      <div className="mt-8 space-y-4 text-sm text-gray-700">
        <div>
          <strong>Edad:</strong> {quizAnswers.age}  
          {quizAnswers.age === correctAnswers.age ? (
            <span> ✅ Correcto. Tengo {correctAnswers.age} años.</span>
          ) : (
            <span> ❌ En realidad tengo {correctAnswers.age} años.</span>
          )}
        </div>

        <div>
          <strong>Cualidad más valorada:</strong> {quizAnswers.qualities}
          {quizAnswers.qualities === correctAnswers.qualities ? (
            <span> ✅ Muy bien, eso es lo que más me importa en una chica.</span>
          ) : (
            <span> ❌ Lo que más valoro es la honestidad, respeto, valentía y ganas de crecer.</span>
          )}
        </div>

        <div>
          <strong>Habilidad más atractiva:</strong> {quizAnswers.skills}
          {quizAnswers.skills === correctAnswers.skills ? (
            <span> ✅ ¡Exacto! Me encanta la creatividad artística.</span>
          ) : (
            <span> ❌ Valoro más el arte y la sensibilidad como dibujar o escribir.</span>
          )}
        </div>

        <div>
          <strong>Dónde te vi:</strong> {quizAnswers.firstSeen}
          {quizAnswers.firstSeen === "En una red social mientras veía historias." ? (
            <span> ✅ Sí, fue en TikTok en 2023.</span>
          ) : (
            <span> ❌ En realidad fue en TikTok en 2023.</span>
          )}
        </div>

        <div>
          <strong>¿Por qué hice eso?:</strong> {quizAnswers.reason}
          {quizAnswers.reason === "Porque me interesas genuinamente." ? (
            <span> ✅ Esa es la verdad 😊.</span>
          ) : (
            <span> ❌ La verdad es que lo hice porque me interesas de verdad.</span>
          )}
        </div>

        <div>
          <strong>Tipo de música:</strong> {quizAnswers.music}
          {quizAnswers.music === correctAnswers.music ? (
            <span> ✅ Muy bien, escucho bastante variedad, pero esa lista es la más real.</span>
          ) : (
            <span> ❌ Mi gusto musical es más variado: AfroPop, rap español, Amapiano, etc.</span>
          )}
        </div>

       
        <button
           className="p-2 text-white bg-red-600 rounded"
          onClick={() => {
            setStep(step + 1);
            localStorage.setItem("step", (step + 1).toString());
          }}
        >
          Nos despedimos?
        </button>
        
      </div>
    )}


     

        
  </div>
)}

{step === 8 && (
  <div className="mt-10 text-center">
    <h2 className="mb-4 text-3xl font-bold" color = "pink">
      ¡Gracias por llegar hasta aquí, Srta. {name} ♥️!
    </h2>
    <p className="mb-4 text-lg text-gray-600">
    Este pequeño viaje fue una forma especial de compartir algo contigo.
    </p>
    <p className="mb-6 text-gray-500 text-md">
      Aprecio mucho que te hayas tomado el tiempo para divertirte un poco con mi creacion espero que la haya gustado.
    </p>
    <small className="mb-2">Me interesas. No sé qué pasará, pero aquí estoy 🙂</small>
           

    <h1 className="uppercase">Life is good…
and <br></br> you are beautiful.</h1>

    <button
  className="px-6 py-3 mt-8 text-white transition rounded-full bg-red-700 hover:bg-red-800"
  onClick={() => {
    localStorage.clear();         // Elimina todos los datos del localStorage
    setStep(0);                   // Reinicia el paso
    setName("");                  // Reinicia el nombre
    setQuizAnswers({});          // Limpia las respuestas si tienes este estado también
  }}
>
  Bye 
</button>

  </div>
)}




      </div>
    </section>
  );
}
