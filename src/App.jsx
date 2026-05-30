import "./assets/styles/App.css";
import React, { useState, useEffect } from "react";
import { Header, JogoField, Footer, Tabuleiro, Dashboard, PainelJogador } from "./components/";
import { colocarNaviosAleatorio } from "./components/logicabot";

function App() {
  const [nome_Jogador, setPlayerName] = useState("");
  const [faseJogo, setFaseJogo] = useState("inicio");
  const [tabuleiroJogador, setTabuleiroJogador] = useState(null);
  const [estrategiaBot, setEstrategiaBot] = useState("aleatoria");
  const [Debug, setDebug] = useState(false);
  const [combustivel, setCombustivel] = useState(100);
  const [tempo, setTempo] = useState(15);
  const [acertosjog, setAcertosJog] = useState(0);
  const [acertosbot, setAcertosBot] = useState(0);
  const [informacao, setInformacao] = useState("Aguardando uma ação do utilizador");
  const [tabuleiroBot, setTabuleiroBot] = useState(null);
  const [tirosTabuleiroBotVisible, setTirosTabuleiroBotVisible] = useState(
    Array(10).fill(null).map(() => Array(10).fill(null))
  );
  const [tirosTabuleiroJogador, setTirosTabuleiroJogador] = useState(
    Array(10).fill(null).map(() => Array(10).fill(null))
  );
  const [vezDeQuem, setVezDeQuem] = useState("jogador");

  const iniciarJogo = (nome) => {
    if (nome.trim() !== "") {
      setFaseJogo("jogo");
    } else {
      alert("Tens de inserir um nome para inciar o jogo!");
    }
  };

  const IniciardoFim = () => {
    setFaseJogo("inicio");
    setPlayerName("");
    setDebug(false);
    setTirosTabuleiroJogador(Array(10).fill(null).map(() => Array(10).fill(null)));
    setTirosTabuleiroBotVisible(Array(10).fill(null).map(() => Array(10).fill(null)));
  }

  const VerficaFinal = () => {
    if (acertosjog === 19) {
      setFaseJogo("fimjog");
      setAcertosBot(0);
      setAcertosJog(0);
      setTabuleiroBot(null);
      setTabuleiroJogador(null);
    }
    if (acertosbot === 19) {
      setFaseJogo("fimbot");
      setAcertosBot(0);
      setAcertosJog(0);
      setTabuleiroBot(null);
      setTabuleiroJogador(null);
    }
    if (combustivel === 80) {
      setFaseJogo("fimbot");
      setCombustivel(100);
      setAcertosBot(0);
      setAcertosJog(0);
      setTabuleiroBot(null);
      setTabuleiroJogador(null);
    }
  };

  const finalizarSetup = (mapaPronto) => {
    const mapa = mapaPronto || Array(10).fill(null).map(() => Array(10).fill(0));
    setTabuleiroJogador(mapa);
    setTabuleiroBot(colocarNaviosAleatorio());
    setFaseJogo("batalha");
  };

  useEffect(() => {
    if (faseJogo === "batalha" && vezDeQuem === "jogador") {
      if (tempo > 0) {
        const temporizador = setInterval(() => {
          setTempo((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(temporizador);
      } else if (tempo === 0) {
        setCombustivel((c) => Math.max(0, c - 5));
        setInformacao("O teu tempo acabou!! Perdeste 5 de combustível. Vez do Bot.");
        setVezDeQuem("bot");        
        setTimeout(() => botAtira(tirosTabuleiroJogador), 1500);
      }
    }
  }, [faseJogo, tempo, vezDeQuem]);

  const handleTiroJogador = (linha, coluna) => {
    if (vezDeQuem !== "jogador") return;
    if (tirosTabuleiroBotVisible[linha][coluna] !== null) return;
    const acertou = tabuleiroBot[linha][coluna] !== null && tabuleiroBot[linha][coluna] !== 0;

    const novosMarcadores = tirosTabuleiroBotVisible.map(l => [...l]);
    novosMarcadores[linha][coluna] = acertou ? "hit" : "miss";
    setTirosTabuleiroBotVisible(novosMarcadores);
    if (acertou) {
        setInformacao("Acertaste em cheio! Ganhaste +5 Combustível. Vez do Bot.");
        setCombustivel(c => Math.min(100, c + 5)); 
        setAcertosJog(acertosjog+1);
    } else {
        setInformacao("Tiro na água! Perdeste -5 Combustível. Vez do Bot.");
        setCombustivel(c => Math.max(0, c - 5));
    }

    setVezDeQuem("bot");
    setTempo(15); 
    
    setTimeout(() => botAtira(tirosTabuleiroJogador), 1500);
  };

  const botAtira = (tirosAtuaisJogador) => {
    const disponiveis = [];
    tirosAtuaisJogador.forEach((linha, r) =>
      linha.forEach((v, c) => { if (v === null) disponiveis.push([r, c]); })
    );

    if (disponiveis.length === 0) return; 

    const [r, c] = disponiveis[Math.floor(Math.random() * disponiveis.length)];
    
    const acertou = tabuleiroJogador[r][c] !== null && tabuleiroJogador[r][c] !== 0; 

    const novosTiros = tirosAtuaisJogador.map(l => [...l]);
    novosTiros[r][c] = acertou ? "hit" : "miss";
    setTirosTabuleiroJogador(novosTiros);

    setInformacao(acertou ? "O Bot acertou num dos teus navios!" : "O Bot atirou na água. É a tua vez!");
    setInformacao(acertou ? setAcertosBot(acertosbot+1) : setAcertosBot(acertosbot));
    setVezDeQuem("jogador");
    setTempo(15); 
  };

  VerficaFinal();

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
                  <h4 style={{ margin: "0 0 10px 0", color: "#475569" }}>A Tua Frota</h4>
                  <JogoField 
                    matriz={tabuleiroJogador} 
                    tiros={tirosTabuleiroJogador} 
                    isBot={false} 
                  />
                  
                </div>
                <div>
                  <h4 style={{ margin: "0 0 10px 0", color: "#ef4444" }}>Frota do Bot</h4>
                  
                  <JogoField 
                    matriz={tabuleiroBot} 
                    tiros={tirosTabuleiroBotVisible}
                    isBot={true}
                    modoDebug={Debug} 
                    onAtirar={handleTiroJogador} 
                  />
                  
                </div>
              </div>
            </div>
          )}

          {faseJogo === "fimjog" && (
            <div>
              <h1>Fim do Jogo! Ganhaste! Parabens pela vitória, Capitão.</h1>
              <button onClick={IniciardoFim} className="btn-iniciar">Jogar Novamente</button>
            </div>
          )}

          {faseJogo === "fimbot" && (
            <div>
              <h1>Fim do Jogo! Perdeste! Boa sorte na proxima tentativa.</h1>
              <button onClick={IniciardoFim} className="btn-iniciar">Jogar Novamente</button>
            </div>
          )}

        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;