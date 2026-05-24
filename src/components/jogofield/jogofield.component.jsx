import React from "react";

const criarTabuleiroVazio = () => {
  return Array(10).fill(null).map(() => Array(10).fill(0));
};

function GameField() {
  const tabuleiroJogador = criarTabuleiroVazio();
  const letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div style={{ marginTop: "20px" }}>

      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "30px repeat(10, 30px)", 
          gap: "2px",
          justifyContent: "center"
        }}
      >
          <div></div>

        {numeros.map((num) => (
          <div key={`col-${num}`} style={{ fontWeight: "bold", textAlign: "center" }}>
            {num}
          </div>
        ))}

        {tabuleiroJogador.map((linha, indexLinha) => (
          <React.Fragment key={`linha-${indexLinha}`}>
            <div style={{ fontWeight: "bold", textAlign: "center" }}>
              {letras[indexLinha]}
            </div>

            {linha.map((celula, indexColuna) => (
              <div 
                key={`${indexLinha}-${indexColuna}`}
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#87CEEB",
                  border: "1px solid #000"
                }}
              >
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default GameField;