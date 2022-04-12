import { API_Picture } from './types'

const base_url = 'https://picsum.photos/v2/list'

async function getAllPicture(): Promise<Array<API_Picture>> {
    // Get all picture
    // [TODO] remove this return to use a fetch API
    const reponse = await fetch(base_url)
    return await reponse.json()
}

async function getPicture(id: API_Picture['id']): Promise<API_Picture> {
    // Get a picture
    // [TODO] remove this return to use a fetch API
    const reponse = await fetch(`${base_url}/${id}`)
    return await reponse.json()
}

export { getAllPicture, getPicture }
