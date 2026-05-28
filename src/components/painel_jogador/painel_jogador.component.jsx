import React from 'react';

function PlayerPanel({ nome, setNome, onIniciar }) {
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
      
      <button onClick={() => onIniciar(nome)} className="btn-iniciar">
        Iniciar o Jogo
      </button>
    </div>
  );
}

export default PlayerPanel;