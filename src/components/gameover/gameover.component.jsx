import React from 'react';

function GameOver({ faseJogo, jogadasTotais, acertosJogTot, acertosBotTot, combustivelGasto, onReiniciar }) {
    const ganhou = faseJogo === "fimjog";

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>
                {ganhou 
                    ? "Fim do Jogo! Ganhaste! Parabéns pela vitória, Capitão." 
                    : "Fim do Jogo! Perdeste! Boa sorte na próxima tentativa."}
            </h1>
            <h4>Jogadas Totais: {jogadasTotais}</h4>
            <h4>Acertos Totais: {acertosJogTot}</h4>
            <h4>Acertos Totais (BOT): {acertosBotTot}</h4>
            <h4>Gasolina Total Perdida: {combustivelGasto}</h4>
            
            <button onClick={onReiniciar} className="btn-iniciar">
                Jogar Novamente
            </button>
        </div>
    );
}

export default GameOver;