import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateDto, UpdateDto } from './dto';

@Controller('rest/todo')
export class TodoController {

    @Get()
    getAllAction(): string {
        return 'Todo get all';
    }

    @Get(':id')
    getOneAction(@Param('id') id: number): string {
        return `Todo get one by id = ${id}`;
    }

    @Post()
    createAction(@Body() todo: CreateDto): CreateDto {
        return todo;
    }

    @Put(':id')
    updateAction(@Param('id') id: number, @Body() todo: UpdateDto): UpdateDto {
        console.log('Search by ID', id);
        console.log(todo, 'saved');
        return todo;
    }

    @Delete(':id')
    deleteAction(@Param('id') id: number): string {
        return `Delete todo id = ${id}`;
    }
}
