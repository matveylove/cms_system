const express = require('express');
const router = express.Router();
const { prisma } = require('../prisma/prisma-client');
const { auth } = require('../middleware/auth');

/*
*@route GET /api/employees
*@desc Получение всех сотрудников
*@access Private
*/
router.get('/', auth, async (req, res) => {
    try {
        const employees = await prisma.employee.findMany();

        res.status(200).json(employees);
    } catch (error) {
        res.status(400).json({ message: 'Не удалось получить сотрудников' });
    }
})

/*
*@route GET /api/employees/:id
*@desc Получение всех сотрудников
*@access Private
*/
router.get('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await prisma.employee.findUnique({
            where: {
                id,
            }
        })
        res.status(200).json(employee);
    } catch {
        res.status(500).json({ message: "Не удалось получить сотрудника" })
    }
})

/*
*@route POST /api/add
*@desc Добавление сотрудника
*@access Private
*/
router.post('/add', auth, async (req, res, next) => {
    try {
        const data = req.body;

        if (!data.firstName || !data.lastName || !data.adress || !data.age) {
            return res.status(400).json({ message: 'Заполните обязательные поля' });
        }

        const emploee = await prisma.employee.create({
            data: {
                ...data,
                userId: req.user.id
            }
        })
        return res.status(201).json(emploee)
    } catch (err) {
        res.status(400).json({ message: 'Заполните обязательные поля' });
    }
})

/*
*@route POST /api/employees/remove/:id
*@desc Удаление сотрудника
*@access Private
*/
router.post('/remove/:id', auth, async (req, res) => {
    try {
        const { id } = req.body;

        await prisma.employee.delete({
            where: {
                id
            }
        })

        res.status(204).json('OK');

    } catch {
        return res.status(500).json({ message: 'Не удалось удалить сотрудника' });
    }
})

/*
*@route PUT /api/employees/edit/:id
*@desc Редактирование сотрудника
*@access Private
*/
router.put('/edit/:id', auth, async (req, res) => {
    try {
        const data = req.body;
        const id = data.id;

        await prisma.employee.update({
            where: {
                id,
            },
            data
        });

        res.status(204).json('OK')

    } catch {
        res.status(500).json({ message: "Не удалось изменить сотрудника" });
    }
})

module.exports = router;


