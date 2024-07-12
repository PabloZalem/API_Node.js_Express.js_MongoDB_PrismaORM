import express from 'express'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.get('/usuarios', async (req, res) => {
    const usuarios = await prisma.user.findMany();
    res.status(200).json(usuarios);
});

app.post('/usuario', async (req, res) => {
   
    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })
    res.status(201).json(req.body);
})

app.put('/usuario/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })
})

app.delete('/usuario/:id', async (req, res) => {
    
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(204).json({ message: "Usuario deletado" });
})

app.listen(8000);