import "./assets/styles/App.css";
import React, { useState } from "react";
import { Header, JogoField} from "./components/"; 

function App() {
  const [nome_Jogador, setPlayerName] = useState("");
  const [faseJogo, setGamePhase] = useState("inicio");

  const iniciarJogo = (nome) => {
    if (nome.trim() !== "") {
      setPlayerName(nome);
      setGamePhase("jogo"); 
    }
  };

  return (
    <div id="container">
      <Header />
      <main>
        
        {faseJogo === "inicio" && (
          <div className="setup-screen" style={{ textAlign: "center", padding: "20px" }}>
            <h2>Bem-vindo à Batalha Naval!!</h2>
            <p>Insere o teu nome na caixa abaixo:</p>
            <input 
              type="text" 
              placeholder="O teu nome..." 
              value={nome_Jogador}
              onChange={(e) => setPlayerName(e.target.value)}
              style={{ 
                padding: "5px",
                margin: "10px", 
              }}
            />
            <button 
              onClick={() => iniciarJogo(nome_Jogador)}
              style={{ padding: "5px 15px", 
                cursor: "pointer", 
              }}
            >
              Iniciar o Jogo
            </button>
          </div>
        )}

        {faseJogo === "jogo" && (
          <div style={{ textAlign: "center" }}>
            <h3>Capitão {nome_Jogador}</h3>
            <JogoField />
          </div>
        )}

      </main>
      {}
    </div>
  );
}

export default App;