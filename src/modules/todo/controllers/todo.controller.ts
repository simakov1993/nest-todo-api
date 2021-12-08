import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateDto, UpdateDto } from './dto';
import { TodoService } from '../services/todo.service';
import { Todo } from '../entities/todo.entity';

@Controller('rest/todo')
export class TodoController {
    constructor(
        private readonly todoService: TodoService
    ) { }

    @Get()
    getAllAction(): Promise<Todo[]> {
        return this.todoService.findAll();
    }

    @Get(':id')
    async getOneAction(@Param('id') id: number): Promise<Todo> {
        const todo = await this.todoService.findOne(id)
        if (!todo) {
            throw new HttpException('Todo with id = \' + id + \' not found', HttpStatus.NOT_FOUND);
        }
        return todo;
    }

    @Post()
    createAction(@Body() createDto: CreateDto): Promise<Todo> {
        return this.todoService.create(createDto);
    }

    @Put(':id')
    updateAction(@Param('id') id: number, @Body() todo: UpdateDto): Promise<Todo> {
        return this.todoService.update(id, todo);
    }

    @Delete(':id')
    deleteAction(@Param('id') id: number): Promise<void> {
        return this.todoService.remove(id);
    }
}
