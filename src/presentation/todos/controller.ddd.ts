import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodosController {

    //DI
    constructor(
        private readonly todoReposity: TodoRepository,
    ) { }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await this.todoReposity.getAll();
        return res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {

        const id = +req.params.id;
        try {
            const todo = await this.todoReposity.findById(id);
            res.json(todo);
        } catch (error) {
            res.status(400).json({ error })
        }
    }

    public createTodo = async (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDTO.create(req.body)

        if (error) return res.status(400).json({ error })

        const todo = await this.todoReposity.create(createTodoDto!);

        res.json(todo);

    }

    public updateTodo = async (req: Request, res: Response) => {

        const id = +req.params.id
        const [error, updateTodoDTO] = UpdateTodoDTO.create({ ...req.body, id })
        if (error) return res.status(400).json({ error })

        try {
            const updatedTodo = await this.todoReposity.updateById(updateTodoDTO!)
            return res.json(updatedTodo)
        } catch (error) {
            res.status(400).json({ error })
        }
    }

    public deleteTodo = async (req: Request, res: Response) => {

        const id = +req.params.id
        if (isNaN(id)) return res.status(400).json({ error: "ID argument is not a number" });

        const deleted = await this.todoReposity.deleteById(id)

        return res.json(deleted)


    }

}