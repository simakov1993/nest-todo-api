import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '../entities/todo.entity';
import { Repository } from 'typeorm';
import { CreateDto, UpdateDto } from '../controllers/dto';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>
    ) { }

    findAll(): Promise<Todo[]> {
        return this.todoRepository.find();
    }

    findOne(id: number): Promise<Todo> {
        return this.todoRepository.findOne(id);
    }

    create(todo: CreateDto): Promise<Todo> {
        return this.todoRepository.save(todo);
    }

    async update(id: number, todo: UpdateDto): Promise<Todo> {
        const loadedTodo = await this.todoRepository.findOne(id);
        loadedTodo.title = todo.title;
        loadedTodo.isCompleted = todo.isCompleted;
        return this.todoRepository.save(loadedTodo);
    }

    async remove(id: number): Promise<void> {
        await this.todoRepository.delete(id);
    }
}
