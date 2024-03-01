import { ProcessInfos, ResponseData } from '@/types'

export default async function responsePendency(
  token: string,
  processInfos: ProcessInfos,
  responseData: ResponseData
) {
  const body = {
    authorization: `bearer ${token}`,
    responseData: {
      businessData: responseData.businessData,
      flowExecutionData: {
        actionToExecute:
          responseData.flowExecutionData.actionToExecute,
        nextSubject:
          responseData.flowExecutionData.nextSubject,
        userInCopy:
          responseData.flowExecutionData.userInCopy,
      },
    },
    serviceFlowToken: {
      activityId: processInfos.activityId,
      processInstanceID: processInfos.processInstanceID,
      step: processInfos.step,
    },
  }

  const res = await fetch(
    'https://platform.senior.com.br/t/senior.com.br/bridge/1.0/rest/platform/workflow/actions/responsePendency',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  )

  const data = await res.json()

  return data
}
