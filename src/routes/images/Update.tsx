import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/images/update')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/images/Update"!</div>
}
