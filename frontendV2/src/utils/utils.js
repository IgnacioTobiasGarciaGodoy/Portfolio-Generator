export const getWelcomeParts = (type) => {
  const greetings = [
    "Buenos días",
    "Buenas tardes",
    "Buenas noches"
  ];

  const loginPhrases = [
    "Es hora de seguir construyendo tu portafolio",
    "Vamos a darle forma a tus nuevos proyectos",
    "Continúa mostrando tu talento al mundo",
    "Suma más piezas a tu vitrina creativa"
  ];

  const signupPhrases = [
    "Comienza a construir tu portafolio hoy",
    "Da el primer paso hacia tu presencia online",
    "Empieza a mostrar tu trabajo al mundo",
    "Crea tu vitrina de proyectos desde cero"
  ];

  const hour = new Date().getHours();
  let greeting;
  if (hour >= 6 && hour < 13) {
    greeting = greetings[0];
  } else if (hour >= 13 && hour < 20) {
    greeting = greetings[1];
  } else {
    greeting = greetings[2];
  }

  const phraseList = type === "signup" ? signupPhrases : loginPhrases;
  const phrase = phraseList[Math.floor(Math.random() * phraseList.length)];

  return { greeting, phrase };
};
