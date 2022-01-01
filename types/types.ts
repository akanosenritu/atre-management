export type TaskStatus = "done" | "executing" | "failed" | "waiting" | "skipped" | "overwritten"
export type TaskBase = {
  taskName: string,
  initiator: string,
  status: TaskStatus,
  data: any,
  startedAt?: string,
  endedAt?: string,
}

export type Task = TaskBase & {
  subTasks: {
    [taskName: string]: TaskBase
  },
}

export type LogFileObject = {
  logFileNames: string[],
  task: Task
}