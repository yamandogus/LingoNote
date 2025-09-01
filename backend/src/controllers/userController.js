import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { updateProfileValidator } from "../validators/userValidator.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    console.log(existingUser);
    
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Bu email ile kayıtlı bir kullanıcı zaten var." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      }
    });
  console.log(newUser);

    res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu." });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body; 

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({ message: "Kullanıcı bulunamadı." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Geçersiz şifre." });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Giriş başarılı", token });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        avatar: true
      }
    });
    
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const data = updateProfileValidator.parse(req.body);

    // Şifre güncelleniyorsa hashle
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    } else {
      delete data.password;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data
    });

    res.status(200).json({ message: "Profil güncellendi.", user: {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      createdAt: updatedUser.createdAt
    }});
  } catch (error) {
    res.status(400).json({ message: "Profil güncellenemedi.", error: error.message });
  }
};