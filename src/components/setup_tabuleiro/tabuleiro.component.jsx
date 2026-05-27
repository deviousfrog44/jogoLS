import React, { useState } from "react";
import Celula from "./celula.component";

const criarTabuleiroVazio = () => {
    return Array(10).fill(null).map(() => Array(10).fill(null));

};

const frota_inicio = [
    { id: 1, nome: "Navio 1", size: 5 },
  { id: 2, nome: "Navio 2", size: 4 },
  { id: 3, nome: "Navio 3", size: 3 },
  { id: 4, nome: "Navio 4", size: 3 },
  { id: 5, nome: "Navio 5", size: 2 },
  { id: 6, nome: "Navio 6", size: 2 }
];

function Tabuleiro({ onTerminarSetup }) {
    const [tabuleiro, setTabuleiro] = useState(criarTabuleiroVazio());
    const [barcosacolocar, setbarcosaacolocar] = useState(frota_inicio);
    const [orientacao, setOrientacao] = useState("H");
    const letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const clickCelula = (linha, coluna) => {
        if (barcosacolocar.length === 0) return;

    const barcoatual = barcosacolocar[0];
    const size = barcoatual.size;

    if (orientacao === "H" && coluna + size > 10) {
        alert("O navio não cabe na posição escolhida!");
        return;
    }

    if (orientacao === "V" && linha + size > 10) {
        alert("O navio não cabe na posição escolhida!");
        return;
    }

    for (let i = 0; i < size; i++) {
        if (orientacao === "H") {
            if (tabuleiro[linha][coluna + i] !== null) {
                alert("Já existe um navio nessa posição!");
                return;
            }
        } else {
            if (tabuleiro[linha + i][coluna] !== null) {
                alert("Já existe um navio nessa posição!");
                return;
            }
        }
    }

    const novotab = tabuleiro.map((linhaArray) => [...linhaArray]);
    for (let i = 0; i < size; i++) {
        if (orientacao === "H") {
            novotab[linha][coluna + i] = barcoatual.id;
        } else {
            novotab[linha + i][coluna] = barcoatual.id;
        }
    }
    
    setTabuleiro(novotab);
    setbarcosaacolocar(barcosacolocar.slice(1));
};

return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h4>Coloque os navios pretendidos</h4>

    {barcosacolocar.length > 0 ? (
          <div>
            <p>Navio a colocar: {barcosacolocar[0].nome} (tamanho {barcosacolocar[0].size})</p>
            <button onClick={() => setOrientacao(orientacao === "H" ? "V" : "H")}>
              Mudar Orientação (Atual: {orientacao === "H" ? "Horizontal" : "Vertical"})
            </button>
          </div>
        ) : (
        <div>
          <p>Todos os navios foram colocados!!</p>
        <button style={{ padding: "10px", background: "#4CAF50", color: "white", borderRadius: "5px", border: "none", cursor: "pointer" }} onClick={() => onTerminarSetup(tabuleiro)}>
            Começar Jogo
            </button>
        </div>
        )}
<div style={{ display: "grid", gridTemplateColumns: "30px repeat(10, 30px)", gap: "2px" }}>
    <div></div>

    {numeros.map(num => <div key={`col-${num}`} style={{ textAlign: "center", fontWeight: "bold" }}>{num}</div>)}

    {tabuleiro.map((linha, i) => (
        <React.Fragment key={`linha-${i}`}>
            <div style={{ textAlign: "center", fontWeight: "bold" }}>{letras[i]}</div>

            {linha.map((celula, coluna) => (
                <Celula
                    key={`celula-${i}-${coluna}`}
                    valor={celula}
                    onClick={() => clickCelula(i, coluna)}
                    barcospendentes={barcosacolocar.length}
                    />
            ))}
        </React.Fragment>
    ))}
</div>
    </div>
);
}

export default Tabuleiro;
                
