import { User } from './types'

const base_url = 'http://localhost:3004/users'

async function getAllUser(): Promise<Array<User>> {
    const reponse = await fetch(base_url)
    return await reponse.json()
}

async function getUser(id: User['id']): Promise<User> {
    const reponse = await fetch(`${base_url}/${id}`)
    return await reponse.json()
}

export { getAllUser, getUser }
