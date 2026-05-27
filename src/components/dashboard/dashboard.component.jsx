import React from 'react';

function Dashboard({ combustivel, tempo, informacao }) {
    return (
        <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            backgroundColor: "#f3f4f6", 
            border: "3px solid #3b3174", 
            padding: "15px 30px", 
            borderRadius: "15px", 
            marginBottom: "30px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            color: "#333",
            width: "100%",
            boxSizing: "border-box"
        }}>
            
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: "bold", fontSize: "1.1rem" }}>
                <span style={{ color: "#6b7280" }}>Combustível:</span>
                <span style={{ 
                    backgroundColor: combustivel < 30 ? "#ef4444" : "#888", 
                    color: "white", 
                    padding: "5px 15px", 
                    borderRadius: "8px",
                    fontSize: "1.2rem"
                }}>
                    {combustivel}
                </span>
            </div>

            <div style={{ 
                fontWeight: "bold", 
                color: "#3b3174", 
                fontSize: "1.2rem", 
                textAlign: "center" 
                }}>
                {informacao}
            </div>

            <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "10px", 
                fontWeight: "bold", 
                fontSize: "1.1rem" 
                }}>
                <span style={{ color: "#6b7280" }}>Tempo:</span>
                <span style={{ 
                    backgroundColor: "#888", 
                    color: "white", 
                    padding: "5px 15px", 
                    borderRadius: "8px",
                    fontSize: "1.2rem"
                }}>
                    {tempo}
                </span>
            </div>

        </div>
    );
}

export default Dashboard;