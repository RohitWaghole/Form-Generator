import resDataModel from '../../DB/ResDataModel.js';
import mongoose from 'mongoose';
var ObjectId = mongoose.Types.ObjectId;


const saveResController = async (req, res) => {

    const response=req.body.data;
    const formID=new ObjectId(req.body.formID);

    await resDataModel.findOne({formID:formID}).then((queryRes)=>{

        if(!queryRes){
            const newRes=new resDataModel({
                formID:formID,
                responses: [response]
            })

            newRes.save();

            return res.send({ status: true, massage: "response submitted!" })
        }

        else{
            resDataModel.updateOne({formID:formID}, {$push:{ "responses": response }}).then((queryRes2)=>{

                return res.send({ status: true, massage: "response submitted!" })

            }).catch((queryErr2)=>{
                console.log(queryErr2)
                return res.send({ status: false, massage: queryErr2 })
            })
        }

    }).catch((queryErr)=>{
        console.log(queryErr)
        return res.send({ status: false, massage: queryErr })
    })
}

export default saveResController