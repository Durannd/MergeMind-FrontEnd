

export const fetchProjects = async (page) => {
    

    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/projects/id?page=${page}&sort=title,asc`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });

     
    if (!response.ok) {
        throw new Error('Failed to fetch projects');
    }

    const data = await response.json();
    return data;
}