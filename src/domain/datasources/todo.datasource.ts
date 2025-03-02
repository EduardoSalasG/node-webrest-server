import { CreateTodoDTO } from "../dtos";
import { TodoEntity } from "../entities/todo.entitiy";
import { UpdateTodoDTO } from '../dtos/todos/update-todo.dto';



export abstract class TodoDatasource {

    abstract create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity>

    //TODO: Paginación
    abstract getAll(): Promise<TodoEntity[]>;

    abstract findById(id: number): Promise<TodoEntity>
    abstract updateById(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity>
    abstract deleteById(id: number): Promise<TodoEntity>

}