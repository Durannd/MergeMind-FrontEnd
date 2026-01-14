import { createLazyFileRoute, Outlet } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchProjects } from '../components/fetchProjects.jsx'
import { Card } from 'flowbite-react'
import { Pagination } from 'flowbite-react'
import { useNavigate } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/projects/')({
  component: listProjects,
})

function listProjects() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const page = currentPage - 1
  const onPageChange = (page) => setCurrentPage(page)

  const { data, error, isLoading } = useQuery({
    queryKey: ['projects', currentPage],
    queryFn: () => fetchProjects(currentPage - 1),
    keepPreviousData: true,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading projects: {error.message}</div>

  return (
    <>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 ">
        {data.content.map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden hover:scale-105  transition-transform m-7"
            onClick={() => navigate({ to: `/projects/${project.id}` })}
          >
            <div className="xl:h-32 w-full overflow-hidden">
              <img
                src={
                  project.banner_url ||
                  'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                }
                alt="Banner project"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2 mb-2">
                {project.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
                {project.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={page + 1}
          totalPages={data.totalPages}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </>
  )
}
