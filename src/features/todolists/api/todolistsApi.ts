import { GeneralResponse } from "common/types"
import { baseApi } from "../../../app/baseApi"
import { TodolistDomain } from "../lib/types/types"
import { Todolist } from "./todolistsApi.types"

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<any[], void>({
      query: () => "todo-lists",
      // как аргументы - то, что приходит из query
      // трансформируем TodolistType[] в TodolistDomain[]
      transformResponse(todolists: Todolist[]): TodolistDomain[] {
        return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      },
      providesTags: ["Todolist"],
    }),

    addTodolist: build.mutation<GeneralResponse<{ item: Todolist }>, string>({
      query: (title) => {
        return {
          url: "todo-lists",
          method: "POST",
          body: { title },
        }
      },
      invalidatesTags: ["Todolist"], // make todolists query again (providesTags: ["Todolist"])
    }),

    removeTodolist: build.mutation<GeneralResponse, string>({
      query: (id) => {
        return {
          method: "DELETE",
          url: `todo-lists/${id}`,
        }
      },
      invalidatesTags: ["Todolist"],
    }),

    changeTodolistTitle: build.mutation<GeneralResponse, ChangeTodolistTitleArgs>({
      query: ({ id, title }) => {
        return {
          url: `/todo-lists/${id}`,
          method: "PUT",
          body: { title },
        }
      },
      invalidatesTags: ["Todolist"],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useAddTodolistMutation,
  useRemoveTodolistMutation,
  useChangeTodolistTitleMutation,
} = todolistsApi

export type ChangeTodolistTitleArgs = {
  id: string
  title: string
}
