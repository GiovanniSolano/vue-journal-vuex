import axios from "axios";


const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
        key: 'AIzaSyB6jZs248qHBetM3DpCfoNYVvJk7nrLinY'
    }
})

// process.env.NODE_ENV TEST durante testing

export default authApi