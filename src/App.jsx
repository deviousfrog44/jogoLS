import "./assets/styles/App.css";
import React, { useState, useEffect } from "react";
import { Header, JogoField, Footer, Tabuleiro, Dashboard, PainelJogador } from "./components/";
import { colocarNaviosAleatorio, obterFrotaFixa } from "./components/logicabot";

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

  const [combustivelgasto, setCombustivelGasto] = useState(0);
  const [acertojogtot, setAcertosJogTot] = useState(0);
  const [acertobottot, setAcertosBotTot] = useState(0);

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
    setAcertosBotTot(0);
    setAcertosJogTot(0);
    setCombustivelGasto(0);
    setCombustivel(100);
    setTempo(15);
  };

  useEffect(() => {
    if (faseJogo === "batalha") {
      if (acertosjog === 19 || acertosbot === 19 || combustivel === 0) {
        setAcertosBotTot(acertosbot);
        setAcertosJogTot(acertosjog);
        
        if (acertosjog === 19) {
          setFaseJogo("fimjog"); 
        } else {
          setFaseJogo("fimbot"); 
        }
      }
    }
  }, [acertosjog, acertosbot, combustivel, faseJogo]);

  const finalizarSetup = (mapaPronto) => {
    const mapa = mapaPronto || Array(10).fill(null).map(() => Array(10).fill(0));
    setTabuleiroJogador(mapa);

    if (estrategiaBot === "aleatoria") {
      setTabuleiroBot(colocarNaviosAleatorio());
    } else {
      setTabuleiroBot(obterFrotaFixa(estrategiaBot));
    }

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
    const idBarco = tabuleiroBot[linha][coluna];
    const acertou = idBarco !== null && idBarco !== 0;
    
    const novosMarcadores = tirosTabuleiroBotVisible.map(l => [...l]);
    novosMarcadores[linha][coluna] = acertou ? "hit" : "miss";
    
    if (acertou) {
        let afundou = true;
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                if (tabuleiroBot[r][c] === idBarco && novosMarcadores[r][c] !== "hit") {
                    afundou = false; 
                }
            }
        }

        if (afundou) {
            for (let r = 0; r < 10; r++) {
                for (let c = 0; c < 10; c++) {
                    if (tabuleiroBot[r][c] === idBarco) {
                        novosMarcadores[r][c] = "sunk";
                    }
                }
            }
            setInformacao("Afundaste um navio inimigo! Ganhaste +5 de Combustível.");
        } else {
            setInformacao("Acertaste num navio! Ganhaste +5 de Combustível.");
        }
        setCombustivel(c => Math.min(100, c + 5)); 
        setAcertosJog(prev => prev + 1);
    } else {
        setInformacao("Acertaste na água! Perdeste -5 de Combustível. Vez do Bot.");
        setCombustivel(c => Math.max(0, c - 5));
        setCombustivelGasto(prev => prev + 5);
    }

    setTirosTabuleiroBotVisible(novosMarcadores);
    setVezDeQuem("bot");
    setTempo(15); 
    setTimeout(() => botAtira(tirosTabuleiroJogador), 1500);
  };

  const botAtira = (tirosAtuaisJogador) => {
    let r, c;
    const alvosAdjacentes = [];

    for (let linha = 0; linha < 10; linha++) {
        for (let coluna = 0; coluna < 10; coluna++) {
            if (tirosAtuaisJogador[linha][coluna] === "hit") {
                if (linha > 0 && tirosAtuaisJogador[linha - 1][coluna] === null) alvosAdjacentes.push([linha - 1, coluna]);
                if (linha < 9 && tirosAtuaisJogador[linha + 1][coluna] === null) alvosAdjacentes.push([linha + 1, coluna]);
                if (coluna > 0 && tirosAtuaisJogador[linha][coluna - 1] === null) alvosAdjacentes.push([linha, coluna - 1]);
                if (coluna < 9 && tirosAtuaisJogador[linha][coluna + 1] === null) alvosAdjacentes.push([linha, coluna + 1]);
            }
        }
    }

    if (alvosAdjacentes.length > 0) {
        const alvo = alvosAdjacentes[Math.floor(Math.random() * alvosAdjacentes.length)];
        r = alvo[0];
        c = alvo[1];
    } else {
        const disponiveis = [];
        tirosAtuaisJogador.forEach((linhaArr, rowIndex) =>
          linhaArr.forEach((v, colIndex) => { if (v === null) disponiveis.push([rowIndex, colIndex]); })
        );
        
        if (disponiveis.length === 0) return; 
        
        const alvo = disponiveis[Math.floor(Math.random() * disponiveis.length)];
        r = alvo[0];
        c = alvo[1];
    }

    const idBarco = tabuleiroJogador[r][c];
    const acertou = idBarco !== null && idBarco !== 0; 

    const novosTiros = tirosAtuaisJogador.map(l => [...l]);
    novosTiros[r][c] = acertou ? "hit" : "miss";
    
    if (acertou) {
      let afundou = true;
      for (let linha = 0; linha < 10; linha++) {
          for (let coluna = 0; coluna < 10; coluna++) {
              if (tabuleiroJogador[linha][coluna] === idBarco && novosTiros[linha][coluna] !== "hit") {
                  afundou = false;
              }
          }
      }

      if (afundou) {
          for (let linha = 0; linha < 10; linha++) {
              for (let coluna = 0; coluna < 10; coluna++) {
                  if (tabuleiroJogador[linha][coluna] === idBarco) {
                      novosTiros[linha][coluna] = "sunk"; 
                  }
              }
          }
          setInformacao("O Bot afundou um dos teus navios!");
      } else {
          setInformacao("O Bot acertou num dos teus navios!");
      }      
      setAcertosBot(prev => prev + 1);
    } else {
      setInformacao("O Bot atirou na água. É a tua vez!");
    }
    
    setTirosTabuleiroJogador(novosTiros);
    setVezDeQuem("jogador");
    setTempo(15);
  };

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
              <h4>Acertos Totais: {acertojogtot}</h4>
              <h4>Acertos Totais (BOT): {acertobottot}</h4>
              <h4>Gasolina Total Perdida: {combustivelgasto}</h4>
              <button onClick={IniciardoFim} className="btn-iniciar">Jogar Novamente</button>
            </div>
          )}

          {faseJogo === "fimbot" && (
            <div>
              <h1>Fim do Jogo! Perdeste! Boa sorte na proxima tentativa.</h1>
              <h4>Acertos Totais: {acertojogtot}</h4>
              <h4>Acertos Totais (BOT): {acertobottot}</h4>
              <h4>Gasolina Total Perdida: {combustivelgasto}</h4>
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