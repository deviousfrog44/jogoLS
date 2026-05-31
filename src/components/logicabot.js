const frota_inicio = [
  { id: 1, size: 5 }, { id: 2, size: 4 }, { id: 3, size: 3 },
  { id: 4, size: 3 }, { id: 5, size: 2 }, { id: 6, size: 2 }
];

export function colocarNaviosAleatorio() {
  let tab = Array(10).fill(null).map(() => Array(10).fill(null));
  
  for (const barco of frota_inicio) {
    let colocado = false;
    while (!colocado) {
      const orientacao = Math.random() < 0.5 ? "H" : "V";
      const linha = Math.floor(Math.random() * 10);
      const coluna = Math.floor(Math.random() * 10);
      
      if (orientacao === "H" && coluna + barco.size > 10) continue;
      if (orientacao === "V" && linha + barco.size > 10) continue;
      
      let valido = true;
      for (let i = 0; i < barco.size; i++) {
        const r = orientacao === "H" ? linha : linha + i;
        const c = orientacao === "H" ? coluna + i : coluna;
        if (tab[r][c] !== null) { valido = false; break; }
      }
      
      if (valido) {
        for (let i = 0; i < barco.size; i++) {
          const r = orientacao === "H" ? linha : linha + i;
          const c = orientacao === "H" ? coluna + i : coluna;
          tab[r][c] = barco.id;
        }
        colocado = true;
      }
    }
  }
  return tab;
}

function colocarBarco(mapa, id, size, linha, coluna, orientacao) {
  for (let i = 0; i < size; i++) {
    if (orientacao === "H") mapa[linha][coluna + i] = id;
    else mapa[linha + i][coluna] = id;
     }
  }

  export function obterFrotaFixa(tipodefrota) {
    let mapa = Array(10).fill(null).map(() => Array(10).fill(null));

    if (tipodefrota === "frota1") {
      colocarBarco(mapa, 1, 5, 0, 0, "H");
      colocarBarco(mapa, 2, 4, 2, 0, "H");
      colocarBarco(mapa, 3, 3, 4, 0, "H");
      colocarBarco(mapa, 4, 3, 6, 0, "H");
      colocarBarco(mapa, 5, 2, 8, 0, "H");
      colocarBarco(mapa, 6, 2, 9, 0, "H");

    } else if (tipodefrota === "frota2") {
      colocarBarco(mapa, 1, 5, 4, 3, "H");
      colocarBarco(mapa, 2, 4, 0, 5, "V");
      colocarBarco(mapa, 3, 3, 6, 0, "H");
      colocarBarco(mapa, 4, 3, 1, 7, "V");
      colocarBarco(mapa, 5, 2, 8, 2, "H");
      colocarBarco(mapa, 6, 2, 9, 5, "H");

    } else if (tipodefrota === "frota3") {
      colocarBarco(mapa, 1, 5, 0, 0, "V");
      colocarBarco(mapa, 2, 4, 0, 2, "V");
      colocarBarco(mapa, 3, 3, 0, 4, "V");
      colocarBarco(mapa, 4, 3, 0, 6, "V");
      colocarBarco(mapa, 5, 2, 0, 8, "V");
      colocarBarco(mapa, 6, 2, 2, 8, "H");
    }
    return mapa;
  }
