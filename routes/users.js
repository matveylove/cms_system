const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { prisma } = require('../prisma/prisma-client');
const jwt = require('jsonwebtoken');
const { auth } = require('../middleware/auth');
/*
*@route POST /api/user/login
*@desc логин
*@access Public
*/
router.post('/login', async function (req, res, next) {

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Пожалуйста, заполните обязательные поля' });
    }

    const user = await prisma.user.findFirst({ where: { email: email } });

    const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));
    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
      })
    } else {
      return res.status(400).json({ message: 'Неверно введен логин или пароль' });
    }
  } catch {
    res.status(400).json({ message: 'Неверно введен логин или пароль' });
  }
});

/*
*@route POST /api/user/register
*@desc Регистрация
*@access Public
*/

router.post('/register', async function (req, res, next) {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Пожалуйста заполните обязательные поля' });
    }

    const registeredUser = await prisma.user.findFirst({
      where: {
        email
      }
    })


    if (registeredUser) {
      return res.status(400).json({ message: 'Пользователь с таким email уже зарегестрирован' })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    })

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
      })
    } else {
      return res.status(400).json({ message: 'Не удалось создать пользователя' });
    }
  } catch {
    res.status(400).json({ message: 'Не удалось создать пользователя' });
  }

});

/*
*@route GET /api/user/current
*@desc Получение текущего пользователя
*@access Private
*/

router.get('/current', auth, async function (req, res, next) {
  return res.status(200).json(req.user)
});

module.exports = router;
