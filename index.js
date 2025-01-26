import express from 'express'
import multer from 'multer'
import cors from 'cors'

import mongoose from 'mongoose'

import {registerValidation} from './validations/auth.js'
import { loginValidation } from './validations/login.js'
import { postCreateValidation } from './validations/postCreation.js'

import checkAuth from "./utils/checkAuth.js"
import { register, login, getMe } from './controllers/userController.js';
import * as postController from './controllers/postController.js'
import handleValidationErrors from './utils/handleValidationErrors.js'

mongoose.connect('mongodb://andrewgrigs88:Ty3n8ZL3B1nkCI67@cluster0/?ssl=true&replicaSet=atlas-5vr42u-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0')
        .then(()=>{
            console.log('db works')
        }).catch((err)=>{
            console.log('db error', err)
        })


const app = express();

app.use(express.json())
app.use(cors())


app.post('/auth/login',loginValidation, handleValidationErrors, login);
app.post('/auth/register',registerValidation, handleValidationErrors, register)
app.get('/auth/me', checkAuth, getMe)

app.get('/tags',  postController.getLastTags)
app.get('/posts',  postController.getAll)
app.get('/posts/tags',  postController.getLastTags)
app.get('/posts/:id',  postController.getOne)
app.post('/posts',checkAuth,postCreateValidation, handleValidationErrors, postController.create)
app.delete('/posts/:id', checkAuth,  postController.deleteOne)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors , postController.updateOne)

app.listen(4444, (err) => {
    if(err){
        return console.log(err)
    }

    console.log('Server works')
})
