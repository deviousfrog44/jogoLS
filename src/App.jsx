import "./assets/styles/App.css";
import React, { useState } from "react";
import { Header, JogoField} from "./components/"; 
import Tabuleiro from "./components/setup_tabuleiro/tabuleiro";

function App() {
  const [nome_Jogador, setPlayerName] = useState("");
  const [faseJogo, setFaseJogo] = useState("inicio");
  const [tabuleiroJogador, setTabuleiroJogador] = useState(null);

  const iniciarJogo = (nome) => {
    if (nome.trim() !== "") {
      setFaseJogo("jogo");
    } else {
      alert("Por favor, insere o teu nome!");
    }
  };

  const finalizarSetup = (mapaPronto) => {
    setTabuleiroJogador(mapaPronto);
    setFaseJogo("batalha");
  };

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      minHeight: "100vh", 
      backgroundColor: "#222",
      fontFamily: "Arial, sans-serif" 
    }}>
      
      <div style={{ 
        backgroundColor: "#fff", 
        padding: "30px", 
        borderRadius: "15px", 
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)", 
        width: "90%", 
        maxWidth: "700px", 
        textAlign: "center" 
      }}>
        
        <Header />
        
        <main style={{ marginTop: "20px" }}>
          
          {faseJogo === "inicio" && (
            <div className="setup-screen" style={{ textAlign: "center", padding: "20px" }}>
              <h2>Bem-vindo ao jogo de Batalha Naval!!</h2>
              <p>Para poderes começar, insere o teu nome na caixa abaixo:</p>
              <input 
                type="text" 
                placeholder="O teu nome..." 
                value={nome_Jogador}
                onChange={(e) => setPlayerName(e.target.value)}
                style={{ 
                  padding: "8px",
                  margin: "10px", 
                  borderRadius: "5px",
                  border: "1px solid #ccc"
                }}
              />
              <br />
              <button 
                onClick={() => iniciarJogo(nome_Jogador)}
                style={{ 
                  padding: "10px 20px", 
                  cursor: "pointer", 
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  fontWeight: "bold"
                }}
              >
                Iniciar o Jogo
              </button>
            </div>
          )}

          {faseJogo === "jogo" && (
            <div style={{ textAlign: "center" }}>
              <h3>Capitão {nome_Jogador}</h3>
              <Tabuleiro onTerminarSetup={finalizarSetup} />
            </div>
          )}

          {faseJogo === "batalha" && (
            <div style={{ textAlign: "center" }}>
              <h2>Ecrã de Batalha (Em construção...)</h2>
              <p>O teu mapa foi guardado com sucesso, {nome_Jogador}!</p>
            </div>
          )}

        </main>
      </div>

      <footer style={{ marginTop: "20px", color: "#888", letterSpacing: "2px", fontSize: "14px", fontWeight: "bold" }}>
        DEIS @ ISEC
      </footer>

    </div>
  );
}

export default App;