import express from 'express'
import {getPosts, getPost, commentPost, getPostsBySearch, createPosts, updatePost, deletePost, likePost} from '../controllers/posts.controller.js'
import auth from '../middleware/auth.js'
const router = express.Router()

//localhose:5000/posts
//https://www.restapitutorial.com/httpstatuscodes.html
router.get('/search',getPostsBySearch)
router.get('/:id',getPost)
router.get('/',getPosts)
router.post('/',auth,createPosts)
router.patch('/:id',auth,updatePost)
router.delete('/:id',auth, deletePost)
router.patch('/:id/likePost',auth,likePost)
router.post('/:id/commentPost',auth,commentPost)

export default router