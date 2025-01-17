const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Criar um novo usuário
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todos os usuários
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para editar um usuário
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  try {
    // Verifica se o usuário existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Atualiza os campos fornecidos
    user.name = name || user.name;
    user.email = email || user.email;
    user.age = age || user.age;

    // Salva as alterações no banco de dados
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ message: "Erro ao atualizar usuário." });
  }
});

// Deletar um usuário
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
