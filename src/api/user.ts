import { User } from './types'
import axios from 'axios'


const base_url = 'http://localhost:3004/users'

async function getAllUser(): Promise<Array<User>> {
    const response = await fetch(base_url);
    return await response.json();
}

async function getUser(id: User['id']): Promise<User> {
    const response = await fetch(`${base_url}/${id}`);
    return await response.json();
}
async function createUser(user: User): Promise<User> {
    const { data } = await axios.post(`${base_url}`, user)
    return data
}
async function updateUser(user: User): Promise<User> {
    const { data } = await axios.put(`${base_url}/${user.id}`, user)
    return data
}

async function deleteUser(userID: User['id']): Promise<User['id']> {
    const { data } = await axios.delete(`${base_url}/${userID}`)
    return data
}
export { getAllUser, getUser,createUser,updateUser,deleteUser }

