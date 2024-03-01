import { Files } from '@/types'
import { FileUpload } from 'primereact/fileupload'

interface FileUploadProps {
  files: Files[]
  setFiles: (files: Files[]) => void
}

export default function FileUploadComponent({
  files,
  setFiles,
}: FileUploadProps) {
  return (
    <FileUpload
      name="demo[]"
      url={'/api/upload'}
      multiple
      accept="image/*"
      maxFileSize={1000000}
      emptyTemplate={
        <p className="m-0">
          Drag and drop files to here to upload.
        </p>
      }
    />
  )
}
