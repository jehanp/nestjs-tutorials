import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task.status-validation.pipe';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto:GetTasksFilterDto):Task[]{
        console.log(filterDto);
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto);
        }
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string){
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto:CreateTaskDto):Task{
        return this.tasksService.createTask(createTaskDto);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id:string,
        @Body('status', TaskStatusValidationPipe) status:TaskStatus
        ):Task{            
            return this.tasksService.updateTaskStatus(id, status);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string){
        return this.tasksService.deleteTask(id);
    }
}
