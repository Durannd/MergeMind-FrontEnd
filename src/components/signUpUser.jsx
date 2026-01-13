export default async function signUpUser(name, email, password) {


    const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
        if (response.status === 409) {
            throw new Error('Email already in use');
        } else { 
            throw new Error('Failed to sign up user');
        }
    }
    const data = await response.json();
    return data;


}