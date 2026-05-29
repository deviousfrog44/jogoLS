import "./assets/styles/App.css";
import React, { useState, useEffect } from "react";
import {Header, JogoField, Footer, Tabuleiro, Dashboard, PainelJogador} from "./components/"


function App() {
  const [nome_Jogador, setPlayerName] = useState("");
  const [faseJogo, setFaseJogo] = useState("inicio");
  const [tabuleiroJogador, setTabuleiroJogador] = useState(null);

  const [estrategiaBot, setEstrategiaBot] = useState("aleatoria");
  const [Debug, setDebug] = useState(false);
  const [combustivel, setCombustivel] = useState(100);
  const [tempo, setTempo] = useState("15");
  const [informacao, setInformacao] = useState("Aguardando uma ação do utilizador");

  const iniciarJogo = (nome) => {
    if (nome.trim() !== "") {
      setFaseJogo("jogo");
    } else {
      alert("Tens de inserir um nome para inciar o jogo!");
    }
  };

  const finalizarSetup = (mapaPronto) => {
    setTabuleiroJogador(mapaPronto);
    setFaseJogo("batalha");
  };

  useEffect(() => {
    if (faseJogo === "batalha") {

      if (tempo > 0) {
        const temporizador = setInterval(() => {
          setTempo((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(temporizador);
      } else if (tempo === 0) {
        setComubustivel((combustivelAntes) => Math.max(0, combustivelAntes - 5));
        setInformacao("O tempo acabou, perdeste 5 pontos de combustível!");
        setTempo(15);
      }
    }
  }, [faseJogo, tempo]);

  return (
    <div className="app-container">
      <div className="game-card">
        <Header />
        
        <main style={{ marginTop: "20px" }}>
          
          {faseJogo === "inicio" && (
            <PainelJogador 
               nome={nome_Jogador} 
               setNome={setPlayerName} 
               estrategiaBot={estrategiaBot}
                setEstrategiaBot={setEstrategiaBot}
                Debug={Debug}
                setDebug={setDebug}
               onIniciar={iniciarJogo} 
            />
          )}

          {faseJogo === "jogo" && (
            <div style={{ textAlign: "center" }}>
              <h3>Capitão {nome_Jogador}</h3>
              <Tabuleiro onTerminarSetup={finalizarSetup} />
            </div>
          )}

          {faseJogo === "batalha" && (
            <div>
              <Dashboard 
              combustivel={combustivel} 
              tempo={`00:${tempo < 10 ? `0${tempo}` : tempo}`} 
              informacao={informacao} />

              <div className="batalha-container">
                <div>
                  <h4 style={{ 
                    margin: "0 0 10px 0", 
                    color: "#475569" }}>A Tua Frota</h4>
                  <JogoField />
                </div>
                <div>
                  <h4 style={{ 
                    margin: "0 0 10px 0", 
                    color: "#ef4444" }}>Frota do Bot</h4>
                  <JogoField />
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;