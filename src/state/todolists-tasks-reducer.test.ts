import {tasksObjType} from "../temp/App";
import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equal', () => {
    const startTasksState: tasksObjType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = addTodolistAC({
        id: 'todolistId1',
        title: 'What to learn',
        addedDate: '',
        order: 0
    })

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
})


