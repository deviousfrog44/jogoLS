import React from 'react';

function PainelJogador({ nome, setNome, onIniciar, estrategiaBot, setEstrategiaBot, Debug, setDebug }) {
  return (
    <div className="setup-screen" style={{ textAlign: "center", padding: "20px" }}>
      <h2>Bem-vindo ao jogo de Batalha Naval!!</h2>
      <p>Para poderes começar, insere o teu nome na caixa abaixo:</p>
      
      <input 
        type="text" 
        placeholder="O teu nome..." 
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="input-nome"
      />
      <br />

      <div style={{ 
        margin: "20px 0",
        backgroundColor: "#f3f4f6",
        padding: "15px",
        borderRadius: "10px" }}>
        <h4 style={{ 
          marginTop: "0", 
          marginBottom: "10px",
          color: "#374151" }}> Escolha da Frota: </h4>
        <select
        value={estrategiaBot}
        onChange={(e) => setEstrategiaBot(e.target.value)}
        style = {{
          padding:"8px",
          borderRadius:"5px",
          cursor:"pointer"
        }}
        >
          <option value="aleatoria">Frota Aleatória</option>
          <option value = "frota1">Frota 1</option>
          <option value = "frota2">Frota 2</option>
          <option value = "frota3">Frota 3</option>
        </select>
      
<br /><br />

<label style={{ 
  cursor: "pointer",
  color: "#ef4444",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px" }}>
  <input
    type="checkbox"
    checked={Debug}
    onChange={(e) => setDebug(e.target.checked)}
    style={{ 
      width: "18px",
      height: "18px",
      cursor: "pointer"
     }}
  />
  Modo Debug
</label>
</div>

      <button onClick={() => onIniciar(nome)} className="btn-iniciar">
        Iniciar o Jogo
      </button>
    </div>
  );
}

export default PainelJogador;