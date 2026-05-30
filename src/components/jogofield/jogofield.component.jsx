import React from "react";

function JogoField({ matriz, tiros, isBot, modoDebug, onAtirar }) {
  const letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  if (!matriz || !tiros) {
    return <div style={{ marginTop: "20px" }}>A carregar radar...</div>;
  }

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
          <div key={`col-${num}`} style={{ fontWeight: "bold", textAlign: "center", alignContent: "center" }}>
            {num}
          </div>
        ))}

        {matriz.map((linha, indexLinha) => (
          <React.Fragment key={`linha-${indexLinha}`}>
            
            <div style={{ fontWeight: "bold", textAlign: "center", alignContent: "center" }}>
              {letras[indexLinha]}
            </div>

            {linha.map((celula, indexColuna) => {
              const estadoTiro = tiros[indexLinha][indexColuna];
              let corFundo = "#87CEEB"; 
              let cursorRato = isBot ? "crosshair" : "default";

              if (estadoTiro === "hit") {
                corFundo = "#ef4444"; 
                cursorRato = "default";
              } else if (estadoTiro === "sunk") {
                corFundo = "#1e293b"; 
                cursorRato = "default";
              } else if (estadoTiro === "miss") {
                corFundo = "#94a3b8"; 
                cursorRato = "default";
              } else if ((!isBot || modoDebug) && celula !== null && celula !== 0) {
                corFundo = "#475569"; 
              }

              return (
                <div 
                  key={`${indexLinha}-${indexColuna}`}
                  onClick={() => {
                    if (isBot && onAtirar && estadoTiro === null) {
                      onAtirar(indexLinha, indexColuna);
                    }
                  }}
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: corFundo,
                    border: "1px solid #000",
                    cursor: cursorRato, 
                    transition: 'background-color 0.2s'
                  }}
                >
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default JogoField;