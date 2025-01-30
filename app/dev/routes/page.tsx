import Link from 'next/link'

export default function RoutePage() {
  const routes = [
    { name: 'DASHBOARD', path: '/designer/dashboard' },
    { name: 'PROJECTS', path: '/designer/projects' },
    { name: 'CREATE PROJECT', path: '/designer/projects/new' },
    { name: 'PROJECT DETAILS', path: '/designer/projects/testid' },
    { name: 'EDIT PROJECT', path: '/designer/projects/testid/edit' },
    { name: '3d', path: '/designer/3d-editor' },
    { name: 'MATERIALS', path: '/designer/materials' },
  ]

  return (
    <main className="flex flex-col p-4 min-h-screen gap-5">
      {routes.map((route, index) => (
        <Link key={index} href={route.path}>
          <p className="text-4xl">{route.name + `  ` + route.path}</p>
        </Link>
      ))}
    </main>
  )
}
