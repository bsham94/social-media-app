import React, {useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container} from "@material-ui/core"
// import {GoogleLogin} from "react-google-login"
import { useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom'
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './input'
import Icon from './icon'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode"
import {signin, signup} from '../../actions/auth'

const initialState = { firstName: "", lastName: "", email:"",password:"",confirmPassword:""}

const Auth = () => {
    const classes = useStyles()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()
    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignup){
            dispatch(signup(formData,history))
        }else{
            dispatch(signin(formData,history))
        }
        console.log(formData)
    }
    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value})

    }
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => {
            return !prevShowPassword
        })
    }
    const switchMode = () =>{
        setIsSignup((prevIsSignup) => {
            return !prevIsSignup
        })
        setShowPassword(false)
    }
    const googleSuccess = async (res) =>{
        console.log(res)
        // const result = res?.clientId // ? avoids error if res is not defined
        var result
        const token = res?.credential
        if (token) 
        {
            result = jwt_decode(token)
            console.log(result)
        }
        try {
            dispatch({type: 'AUTH', data: {result}})
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure = (error) =>{
        console.log(error)
        console.log("Google Sign In was Unsuccessful. Try Again Later")
    }
    return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half></Input>
                                <Input name="lastName" label="Last Name" handleChange={handleChange}  half></Input>
                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                    
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignup ? "Sign Up" : "Sign In"}
                </Button>
                <GoogleLogin
                    onSuccess = {googleSuccess}
                    onFailure = {googleFailure}
                    render={(renderProps) => (
                        <Button 
                        className={classes.googleButton} 
                        color="primary"
                        variant="contained"
                        fullWidth 
                        onClick={renderProps.onClick} 
                        disabled={renderProps.disabled} 
                        startIcon={<Icon/>}>
                          Google Sign In  
                        </Button>
                    )}
                    cookiePolicy="single_host_origin"
                    />
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth