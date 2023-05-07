import axios from 'axios';

export default class CRUD {

    get = async () => {
        const res = await axios.get(process.env.BAES_URL + 'player-scores/')
            .catch((error) => {
                console.log('something wrong happaned :', error)
            })
        if (res) {
            return res.data
        }
        return false
    }

    getById = async (id) => {
        const res = await axios.get(process.env.BAES_URL + `player-scores/${id}`)
            .catch((error) => {
                console.log('something wrong happaned :', error)
            })
        if (res) {
            return res.data
        }
        return false
    }

    update = async (id, data) => {
        const resOptions = {
            method: 'PUT',
            Headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
        const res = await axios.patch(process.env.BAES_URL + `update-scores/${id}`, resOptions)
            .catch((error) => {
                console.log('something wrong happaned :', error)
            })
        if (res) {
            return res.data
        }
        return false
    }

    create = async (data) => {
        const resOptions = {
            method: 'PUT',
            Headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
        const res = await axios.post(process.env.BAES_URL + `create-scores/`, resOptions)
            .catch((error) => {
                console.log('something wrong happaned :', error)
            })
        if (res) {
            return res.data
        }
        return false
    }

    delete = async (id) => {
        const res = await axios.patch(process.env.BAES_URL + `delete-score/${id}`, { method : 'DELETE'})
        .catch((error) => {
            console.log('something wrong happaned :', error)
        })
    if (res) {
        return res.data
    }
    return false
    }

}