import axios from 'axios'
const baseUrl = 'http://localhost:3002/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(resoponse => resoponse.data)
}

const update = ( id, updatedPerson ) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
    return request.then(response => response.data)
}

const destroy = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, destroy, update }