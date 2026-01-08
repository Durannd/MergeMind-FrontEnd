export default async function signUpUser(name, email, password) {

    try {
        const response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            throw new Error('Failed to sign up user');
        }
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error("Error on sign up:", error);
        throw new Error(error.message);
    }
}