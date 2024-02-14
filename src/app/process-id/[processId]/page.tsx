interface PageProps {
  params: {
    processId: string
  }
}

export default async function PageProps({
  params,
}: PageProps) {
  const { processId } = params

  const res = await fetch(
    'https://platform.senior.com.br/t/senior.com.br/bridge/1.0/rest/platform/workflow/queries/getInfoFromProcessVariables?processInstanceId=1514',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'bearer WtztNXZUmxDBYFmFgs6hPMRbPkjn5chb',
      },
    }
  )

  const processVariables = await res.json()

  return <p>{JSON.stringify(processVariables)}</p>
}
