import { create } from 'zustand'

export interface AnexoFile {
  file: File
  bytes: ArrayBuffer
}

export interface ProcessVariables {
  nome: string
  observacao: string
  arquivosTxt: AnexoFile[]
}

interface ProcessVariablesStore {
  processVariables: ProcessVariables
  setProcessVariables: (
    processVariables: ProcessVariables
  ) => void
}

export const UseProcessVariables =
  create<ProcessVariablesStore>()((set) => ({
    processVariables: {
      nome: '',
      observacao: '',
      arquivosTxt: [],
    },
    setProcessVariables: (processVariables) =>
      set({ processVariables }),
  }))
