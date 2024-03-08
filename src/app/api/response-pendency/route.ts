import getToken from '@/app/process-id/[processId]/get-token'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { processInfos, responseData } = await req.json()

    const token = await getToken()

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

    if (!res.ok) {
      return new NextResponse(data.message, {
        status: res.status,
      })
    }

    return new NextResponse(data, {
      status: 200,
    })
  } catch (error) {
    console.log(error)

    return new NextResponse('Internal Error', {
      status: 500,
    })
  }
}
