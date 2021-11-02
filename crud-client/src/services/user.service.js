import WebClient from "../utils/web-client"

export const fetchUsers = () => {
    return new Promise((resolve, reject) => {
        WebClient.get('/user/read').then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export const fetchSpecificUser = (userId) => {
    return new Promise((resolve, reject) => {
        WebClient.get(`/user/${userId}/read`).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export const deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
        WebClient.delete(`/user/${userId}/delete`).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export const editUser = (userId, payload) => {
    return new Promise((resolve, reject) => {
        WebClient.put(`/user/${userId}/edit`, payload).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export const createUser = (payload) => {
    return new Promise((resolve, reject) => {
        WebClient.post(`/user/create`, payload).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}