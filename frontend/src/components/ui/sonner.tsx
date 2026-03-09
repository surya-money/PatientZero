import { Toaster as Sonner, type ToasterProps } from "sonner"
import { OctagonXIcon, TriangleAlertIcon, InfoIcon, CircleCheckIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      position="top-left"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          error: "!bg-destructive !text-white !border-destructive",
          warning: "!bg-yellow-500 !text-white !border-yellow-500",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
