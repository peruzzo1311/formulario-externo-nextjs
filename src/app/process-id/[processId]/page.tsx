interface PageProps {
  params: {
    processId: string
  }
}

export default function PageProps({ params }: PageProps) {
  const { processId } = params

  return <h1>{processId}</h1>
}
