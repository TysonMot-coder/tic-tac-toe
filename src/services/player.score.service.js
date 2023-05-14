import axios from 'axios';

class PlayerScoreService {

    BASE_URL = process.env.REACT_APP_BASE_URL

    get = async () => {
        const { data } = await axios.get(`${this.BASE_URL}player-scores/`)
            .catch((error) => {
                console.log('something wrong happaned :', error)
            })
        if (data) {
            return data.data
        }
        return false
    }

    getById = async (id) => {
        const res = await axios.get(`${this.BASE_URL}player-scores/${id}`)
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
        const res = await axios.patch(`${this.BASE_URL}update-scores/${id}`, resOptions)
            .catch((error) => {
                console.log('something wrong happaned :', error)
            })
        if (res) {
            return true
        }
        return false
    }

    create = async (data) => {
        const resOptions = {
            method: 'POST',
            Headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
        const res = await axios.post(`${this.BASE_URL}create-scores/`, resOptions)
            .catch((error) => {
                console.log('something wrong happaned :', error)
            })
        if (res) {
            return true
        }
        return false
    }

    delete = async (id) => {
        const res = await axios.patch(`${this.BASE_URL}delete-score/${id}`, { method: 'DELETE' })
            .catch((error) => {
                console.log('something wrong happaned :', error)
            })
        if (res) {
            return true
        }
        return false
    }

}

export default new PlayerScoreService