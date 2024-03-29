'use client'

import { useEffect, useState } from 'react'

import {
  AnexoFile,
  UseProcessVariables,
} from '@/hooks/use-process-variables'

import formatBytes from '@/utils/format-bytes'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'

export default function FormComponent({
  processVariablesProps,
  processId,
}: any) {
  const [isLoading, setIsLoading] = useState(false)
  const { processVariables, setProcessVariables } =
    UseProcessVariables()

  useEffect(() => {
    let arquivosTxt = ''

    if (processVariablesProps.arquivosTxt) {
      arquivosTxt = JSON.parse(
        processVariablesProps.arquivosTxt
      )
    }

    setProcessVariables({
      ...processVariablesProps,
      arquivosTxt,
    })
  }, [processVariablesProps, setProcessVariables])

  if (!processVariables) {
    return
  }

  const downloadFile = (file: AnexoFile) => {
    if (!file) {
      console.error('Anexo inválido.')
      return
    }

    const arrayBuffer = file.bytes
    const blob = new Blob([new Uint8Array(arrayBuffer)], {
      type: file.file.type,
    })

    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = file.file.name

    link.click()

    window.URL.revokeObjectURL(url)
    link.remove()
  }

  const nextStep = async () => {
    setIsLoading(true)

    const processInfos = {
      activityId: '4',
      processInstanceID: processId,
      step: '2',
    }

    const responseData = {
      businessData: JSON.stringify({
        response: {
          ...processVariables,
          arquivosTxt: JSON.stringify(
            processVariables.arquivosTxt
          ),
        },
      }),
      flowExecutionData: {
        actionToExecute: 'Prosseguir',
        nextSubject: null,
        userInCopy: null,
      },
    }

    await fetch('/api/response-pendency', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        processInfos,
        responseData,
      }),
    })

    setIsLoading(false)
  }

  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-1">
        <label className="font-bold" htmlFor="name">
          Nome
        </label>

        <InputText
          id="name"
          placeholder="Digite seu nome..."
          value={processVariables.nome}
          onChange={(e) =>
            setProcessVariables({
              ...processVariables,
              nome: e.target.value,
            })
          }
          readOnly
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-bold" htmlFor="observacao">
          Observação
        </label>

        <InputTextarea
          id="observacao"
          autoResize
          rows={5}
          cols={30}
          value={processVariables.observacao}
          onChange={(e) =>
            setProcessVariables({
              ...processVariables,
              observacao: e.target.value,
            })
          }
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-bold">Arquivos</label>

        <div className="card">
          <DataTable
            rows={10}
            paginator
            value={processVariables.arquivosTxt}
            emptyMessage={'Nenhum arquivo encontrado'}
          >
            <Column field="file.name" header="Nome" />
            <Column field="file.type" header="Tipo" />
            <Column
              header="Tamanho"
              body={(rowData) =>
                formatBytes(rowData.file.size)
              }
            />
            <Column
              header="Ações"
              body={(file: AnexoFile) => (
                <Button
                  icon="pi pi-download"
                  onClick={() => downloadFile(file)}
                />
              )}
            />
          </DataTable>
        </div>
      </div>

      <div className="w-full mt-4 flex justify-center">
        <Button
          loading={isLoading}
          onClick={nextStep}
          label={isLoading ? 'Enviando...' : 'Enviar'}
          icon="pi pi-send"
        />
      </div>
    </main>
  )
}
