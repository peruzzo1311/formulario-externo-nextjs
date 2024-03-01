export interface GetProcessVariables {
  contents: [
    {
      key: string
      value: string
      type: string
    }
  ]
}

export interface ProcessInfos {
  activityId: string
  processInstanceID: string
  step: string
}

export interface ResponseData {
  businessData: string
  flowExecutionData: {
    actionToExecute: string
    nextSubject: string | null
    userInCopy: string | null
  }
}
