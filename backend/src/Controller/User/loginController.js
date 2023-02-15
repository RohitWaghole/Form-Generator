import Jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import userDataModel from '../../DB/UserDataModel.js'
import userTokenDataModel from "../../DB/UserTokenDataModel.js"
import dotenv from 'dotenv'


export const loginController = async (req, res) => {

    const userCreds = req.body

    if (!userCreds.email || !userCreds.password) {
        console.log("Invalid Details")
        res.send({ status: false, massage: "Invalid Details!" })
    }

    userDataModel.findOne({ email: userCreds.email }).then((queryRes) => {
        if (!queryRes) {
            return res.send({ status: false, massage: "User Not Found!" })
        }

        else {
            bcrypt.compare(userCreds.password, queryRes.password).then((isCorrect) => {
                if (isCorrect) {
                    const payload = { id: queryRes.id, email: queryRes.email, password: queryRes.password }

                    Jwt.sign(payload, "SECRET_KEY123456789", (error, token) => {

                        if (error) {
                            console.log(error)
                            return res.send({ status: false, massage: error })
                        }

                        else {                            
                            userTokenDataModel.updateOne({email:queryRes.email},{$set:{token:token}}).then(()=>{
                                return res.send({ status: true, token: token, massage: "Logged in" })
                            }).catch(queryError=>{
                                return res.send({ status: false, massage: queryError })
                            })
                        }
                    })
                }

                else {
                    console.log("Invalid Password!")
                    return res.send({ status: false, massage: "Invalid Password!" })
                }
            })
        }
    }).catch((err) => {
        console.log(err)
        return res.send({ status: false, massage: err })
    })


}   