import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import postRoutes from './routes/posts.routes.js'
import userRoutes from './routes/user.routes.js'
dotenv.config()
const app = express()

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
//Define routes after cors
app.use(cors())

//routes - order matters? / goes at the end or else it overrides other routes
app.use('/posts',postRoutes)
app.use('/user',userRoutes)
app.use('/',(req,res)=>{res.send('Home')})

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
    .catch((error) => error.message )

mongoose.set('useFindAndModify',false)