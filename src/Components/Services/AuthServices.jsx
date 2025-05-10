import React from 'react'
import apiClient from '../API/Axios'

const AuthServices = {

    register: async (values) => {
        try {
            const response = await apiClient.post("Auth/register/web", values)
            console.log(response);
            return response
        } catch (error) {
            console.log(error.response.data.errors);
        }
    }

}

export default AuthServices
