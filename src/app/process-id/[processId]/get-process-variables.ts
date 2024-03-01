import { GetProcessVariables } from '@/types'

export default async function getProcessVariables(
  processId: string,
  token: string
): Promise<GetProcessVariables> {
  const res = await fetch(
    `https://platform.senior.com.br/t/senior.com.br/bridge/1.0/rest/platform/workflow/queries/getInfoFromProcessVariables?processInstanceId=${processId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
      cache: 'no-cache',
    }
  )

  const data = (await res.json()) as GetProcessVariables

  return data
}
