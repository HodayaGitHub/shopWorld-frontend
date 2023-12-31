import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { login, signup } from '../store/actions/user.actions.js'
import { userService } from '../services/user.service.js'


function CustomInput(props) {
    return <TextField {...props} variant="outlined" />
}


export function LoginSignUp() {


    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const [isSignupState, setIsSignupState] = useState(false)

    const SignupSchema = Yup.object().shape({
        username: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('We need your full name'),
        email: Yup.string().email('Invalid email').required('Please provide email'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Please provide a password'),
    })

    const SigninSchema = Yup.object().shape({
        // email: Yup.string().email('Invalid email').required('Please provide email'),
        username: Yup.string().required('We need your full name'),
        password: Yup.string().required('Please provide a password'),
    })

    // function onSubmit(formData) {
    //     console.log('formData:', formData)
    //     ev.preventDefault()
    //     const authFuncs = { signup, login }
    //     const method = isSignupState ? 'signup' : 'login'
    //     authFuncs[method](credentials)
    //         .then((user) => {
    //             console.log(`Welcome ${user.username}`)
    //         })
    //         .catch(err => {
    //             console.error('OOps try again')
    //         })

    // }

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
    }

    async function onSubmit(formData) {
        // ev.preventDefault() // No longer needed with async/await
        console.log(formData)
        const authFuncs = { signup, login }
        const method = isSignupState ? 'signup' : 'login'

        try {
            const user = await authFuncs[method](formData)
            console.log(`Welcome ${user.fullname}`)
        } catch (err) {
            console.error('OOps try again', err)
        }
    }



    function onToggleSignupState() {
        setIsSignupState(!isSignupState)
    }

    // const { username, password, fullname } = credentials

    return (
        <div>
            <h1>{isSignupState ? 'Sign Up' : 'Sign In'}</h1>

            <Formik
                initialValues={{
                    // email: '',
                    password: '',
                    username: '',
                }}
                validationSchema={isSignupState ? SignupSchema : SigninSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <Form className="formik">
                        {isSignupState && (
                            <>
                                <Field as={CustomInput} name="username" label="Full name" />
                                {errors.username && touched.username && <div>{errors.username}</div>}
                            </>
                        )}

                        {/* 
                        <Field as={CustomInput} name="email" type="email" label="Email" />
                        {errors.email && touched.email ? <div>{errors.email}</div> : null} */}

                        <Field as={CustomInput} name="username" label="User Name" />
                        {errors.username && touched.username && <div>{errors.username}</div>}


                        <Field
                            as={CustomInput}
                            name="password"
                            type="password"
                            label="Password"
                            autoComplete="current-password"
                        />
                        {errors.password && touched.password ? <div>{errors.password}</div> : null}

                        <Button type="submit" variant="contained">
                            {isSignupState ? 'Sign Up' : 'Login'}
                        </Button>
                    </Form>
                )}
            </Formik>
            <div className="btns">
                <a href="#" onClick={onToggleSignupState}>
                    {isSignupState ? 'Already a member? Login' : 'New user? Signup here'}
                </a>
            </div>
        </div>
    )
}