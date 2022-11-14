import jwt from 'jsonwebtoken'

//example of middleware use case
//click the like button => auth middleware (next) => like controller
//When the middleware is called, the req object will had data populated before the next action
//So the userId field will be populated before the likePost controler is called
const auth = async (req, res, next) =>{
    try {
        const token =  req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500
        let decodedData
        //Out custom auth that was encoded with salt 'test'
        if(token && isCustomAuth){
            decodedData = jwt.verify(token,'test')
            req.userId = decodedData?.id
        }
        //Google's OAuth
        else{
            decodedData = jwt.decode(token)
            //Google's user id
            req.userId = decodedData?.sub
        }
        //Next action after user is authenticated
        next()
    } catch (error) {
         res.status(401).json({message:error.message})
    }
}


export default auth