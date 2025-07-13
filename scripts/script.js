let vozPTBR = null;

function carregarVozes() {
  return new Promise((resolve) => {
    const vozes = speechSynthesis.getVoices();
    if (vozes.length > 0) {
      vozPTBR = vozes.find((v) => v.lang === "pt-BR");
      resolve();
    } else {
      speechSynthesis.onvoiceschanged = () => {
        const novasVozes = speechSynthesis.getVoices();
        vozPTBR = novasVozes.find((v) => v.lang === "pt-BR");
        resolve();
      };
    }
  });
}

async function falando(falar) {
  if (!vozPTBR) await carregarVozes();
  const fala = new SpeechSynthesisUtterance(falar);
  fala.lang = "pt-BR";
  if (vozPTBR) fala.voice = vozPTBR;
  speechSynthesis.speak(fala);
}


