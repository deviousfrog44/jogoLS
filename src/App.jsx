import "./assets/styles/App.css";
import React, { useState } from "react";
import { Header, JogoField} from "./components/"; 

function App() {
  const [nomeJogador, setNomeJogador] = useState("");
  const [faseJogo, setFaseJogo] = useState("inicio");

  const iniciarJogo = (nome) => {
    if (nome.trim() !== "") {
      setNomeJogador(nome);
      setFaseJogo("jogo"); 
    }
  };

  return (
    <div id="container">
      <Header />
      <main>
        
        {faseJogo === "inicio" && (
          <div className="setup-screen" style={{ textAlign: "center", padding: "20px" }}>
            <h2>Bem-vindo à Batalha Naval</h2>
            <p>Insere o teu nome abaixo:</p>
            <input 
              type="text" 
              placeholder="O teu nome..." 
              value={nomeJogador}
              onChange={(e) => setNomeJogador(e.target.value)}
              style={{ padding: "5px", margin: "10px" }}
            />
            <button 
              onClick={() => iniciarJogo(nomeJogador)}
              style={{ padding: "5px 15px", cursor: "pointer" }}
            >
              Começar o Jogo
            </button>
          </div>
        )}

        {faseJogo === "jogo" && (
          <div style={{ textAlign: "center" }}>
            <h3>Capitão {nomeJogador}</h3>
            {}
            <JogoField />
          </div>
        )}

      </main>
      {}
    </div>
  );
}

export default App;