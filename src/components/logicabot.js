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