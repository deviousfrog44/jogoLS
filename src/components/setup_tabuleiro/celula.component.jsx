import React from 'react';

function Celula({ valor, onClick, barcospendentes }) {
    return (
        <div
            onClick={onClick}
            style={{
                width: "30px",
                height: "30px",
                border: "1px solid #999",
                cursor: barcospendentes > 0 ? "pointer" : "default",
                backgroundColor: valor === null ? "#87CEEB" : "#555"
            }}
        />
    );
}

export default Celula;