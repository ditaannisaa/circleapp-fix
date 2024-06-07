import {ChangeEvent, useState} from 'react'
import { TRegister } from '../../../types/UserType'
import { Api } from '../../../libs/axios-threads'
import { useNavigate } from 'react-router-dom'

export function useRegister() {
    const navigate = useNavigate()
    const [form, setForm] = useState<TRegister>({
        full_name: "",
        username: "",
        email: "",
        password: "",
    })

    function handleChange (event: ChangeEvent<HTMLInputElement>) {
        setForm({
          ...form,
            [event.target.name]: event.target.value
        })
    }

    function handleRegister() {
        try {
            const response = Api.post('/auth/register', form)
            console.log(response)

            navigate('/auth/login')
        } catch (err) {
            console.log(err)
        }
    }

    return {form, handleChange, handleRegister}
}