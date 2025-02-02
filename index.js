require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Configuração do app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar JSON
app.use(express.json());

const cors = require("cors");

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://www.gstatic.com"
  );
  next();
});

// Configurar CORS com permissões específicas
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://jovial-florentine-8df070.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"], // Endereço do frontend
  })
);

// Conexão com o MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Rotas
app.use("/api/users", require("./routes/userRoutes"));

// Iniciar o servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
