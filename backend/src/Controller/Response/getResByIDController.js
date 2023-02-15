
import resDataModel from '../../DB/ResDataModel.js';
import mongoose from 'mongoose';
var ObjectId = mongoose.Types.ObjectId;


const getResByIDController = async (req, res) => {

    const formID=new ObjectId(req.query.formID);

    await resDataModel.findOne({formID:formID}).then((queryRes)=>{

        return res.send({ status: true,data:queryRes.responses, massage: "Responses Fetched!" })

    }).catch((queryErr)=>{
        console.log(queryErr)
        return res.send({ status: false, massage: queryErr })
    })
}

export default getResByIDController