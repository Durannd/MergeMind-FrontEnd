import { createLazyFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Card, Badge, Button, Avatar } from 'flowbite-react'
import Status from '../../components/enumStatus';
import SideBarEditRole from '../../components/sideBarEditRole.jsx';
import { useState } from 'react';

export const Route = createLazyFileRoute('/projects/$projectId')({
    component: ProjectDetails,
})

function ProjectDetails() {
    const { projectId } = Route.useParams()
    const navigate = useNavigate()

    
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    const fetchProjectById = async (projectId) => {

        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:8080/api/projects/${projectId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 403) {
            navigate({ to: '/login' });
            throw new Error('Unauthorized');
        }

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    }


    const { data, error, isLoading } = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => fetchProjectById(projectId),
        keepPreviousData: true,
    })



    const findRolesByProjectId = async (projectId) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/api/projects/${projectId}/roles?page=0`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const rolesData = await response.json();
        return rolesData;
    }

    const { data: rolesData, isLoading: isRolesLoading } = useQuery({
        queryKey: ['projectRoles', projectId],
        queryFn: () => findRolesByProjectId(projectId),

    })

    const findParticipantsByProjectId = async (projectId) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/api/projects/participants/${projectId}?page=0`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }

        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const participantsData = await response.json();
        return participantsData;
    }

    const { data: participantsData, isLoading: isParticipantsLoading } = useQuery({
        queryKey: ['projectParticipants', projectId],
        queryFn: () => findParticipantsByProjectId(projectId),
    })

    // Funções de controle do Drawer
    const handleEditRole = (role) => {
        setSelectedRole(role);
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedRole(null);
    };


    if (error) {
        return <div>Error loading project: {error.message}</div>
    }

    if (isLoading) {
        return <div className="text-center text-white text-xl p-10">Loading...</div>
    }

    const isOwner = data.user.id === JSON.parse(localStorage.getItem('user'))?.id;
    if (!JSON.parse(localStorage.getItem('user'))?.id) {
        navigate({ to: '/login' });
    }



    return (
        <div className="min-h-screen">
            {/* Hero Banner */}
            <div className="relative h-80 md:h-96 overflow-hidden rounded-2xl mb-8">
                <img
                    src={data.banner_url}
                    alt="Project Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11151c] via-[#11151c]/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <Badge color="success" className="mb-3 w-fit">{Status[data.status]}</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{data.title}</h1>
                    <h2 className="">{data.short_description}</h2>
                </div>
            </div>
            {isOwner && (
                <div className="flex justify-end mb-6">
                    <Button color="blue" onClick={() => navigate({ to: `/projects/${projectId}/edit` })}>
                        Edit Project
                    </Button>
                </div>
            )}
            <div className="grid md:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                    {/* About */}
                    <Card>
                        <h2 className="text-2xl font-bold text-white mb-4">About the project</h2>
                        <p className="text-gray-300 leading-relaxed">
                            {data.description}
                        </p>
                    </Card>

                    {/* Roles Section */}
                    {isRolesLoading && <p>Loading roles...</p>}
                    {rolesData && rolesData.content.length > 0 && (
                        <Card>
                            <h2 className="text-2xl font-bold text-white mb-4">Available Roles</h2>
                            <div className="space-y-4">
                                {rolesData.content.map(role => (
                                    <div key={role.id} className="border border-gray-700 rounded-lg p-4 hover:border-blue-500 transition-colors">
                                        <h3 className="text-xl font-bold text-white mb-2">{role.name}</h3>
                                        <p className="text-gray-300 mb-3">{role.description}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-wrap gap-2">
                                                {role.stacks.map((stack, index) => {
                                                    const colors = ['indigo', 'purple', 'pink', 'blue', 'cyan', 'teal', 'green'];
                                                    const color = colors[index % colors.length];
                                                    return (
                                                        <Badge key={stack} color={color} className="min-w-[80px] h-8 text-base text-center">{stack}</Badge>
                                                    )
                                                })}
                                            </div>
                                            {!isOwner ? (

                                                <Button size="sm" color="blue">Apply</Button>
                                            ) : (
                                                <>
                                                    <div className="flex gap-2" >
                                                        <Button size="sm" color="green" onClick={() => handleEditRole(role)}>Edit</Button>
                                                    </div>
                                                </>

                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Author */}
                    <Card>
                        <h3 className="text-xl font-bold text-white mb-4">Project Author</h3>
                        <div className="flex items-center gap-3 mb-4">
                            <Avatar
                                img={data.user.photo_url || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                                rounded
                                size="lg"
                            />
                            <div>
                                <p className="font-semibold text-white">{data.user.name}</p>
                                <p className="text-sm text-gray-400">{data.user.bio}</p>
                                <p className="text-sm text-gray-400">{data.user.email}</p>
                                <p className="text-sm text-gray-400">{data.user.github_url}</p>
                            </div>
                        </div>
                    </Card>

                    {/* Technologies */}
                    <Card>
                        <h3 className="text-xl font-bold text-white mb-4">Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                            {data.stacks.map((stack, index) => {
                                const colors = ['indigo', 'purple', 'pink', 'blue', 'cyan', 'teal', 'green'];
                                const color = colors[index % colors.length];
                                return (
                                    <Badge key={stack} color={color} className="min-w-[80px] h-8 text-base text-center">{stack}</Badge>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Participants */}
                    <Card>
                        <h3 className="text-xl font-bold text-white mb-4">Participants</h3>
                        {isParticipantsLoading && <p>Loading participants...</p>}
                        {participantsData && participantsData.content.length > 0 ? (
                            <div className="space-y-4">
                                {participantsData.content.map(participant => (
                                    <div key={participant.id} className="flex items-center gap-3">
                                        <Avatar
                                            img={participant.photo_url || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                                            rounded
                                            size="md"
                                        />
                                        <div>
                                            <p className="font-semibold text-white">{participant.name}</p>
                                            <p className="text-sm text-gray-400">{participant.bio}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400">No participants yet.</p>
                        )}
                    </Card>
                </div>
            </div>

            {/* Sidebar para editar role */}
            <SideBarEditRole 
                isOpen={isDrawerOpen} 
                onClose={handleCloseDrawer} 
                roleData={selectedRole}
            />
        </div>
    )
}