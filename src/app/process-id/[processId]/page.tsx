import FormComponent from '@/components/form'
import { Card } from 'primereact/card'
import getProcessVariables from './get-process-variables'
import getToken from './get-token'

interface PageProps {
  params: {
    processId: string
  }
}

export default async function PageProps({
  params,
}: PageProps) {
  const { processId } = params
  const processVariables = {} as any

  const token = await getToken()

  const GetProcessVariables = await getProcessVariables(
    processId,
    token
  )

  if (!GetProcessVariables) {
    return <h1>Id de processo não encontrado!</h1>
  }

  GetProcessVariables.contents.forEach(
    (processVariable) => {
      const { key, value } = processVariable

      processVariables[key] = value ?? ''
    }
  )

  return (
    <Card className="m-4">
      <FormComponent
        processVariablesProps={processVariables}
        processId={processId}
      />
    </Card>
  )
}
