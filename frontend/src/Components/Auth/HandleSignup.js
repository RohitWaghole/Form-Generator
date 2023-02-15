import userApi from "../API/UserData.js";


const handleSignup = async (userCred) => {

    const res = await userApi.post('/signup', userCred);

    if(res.data.status===true){
        console.log(res.data.massage)
        return true;
    }

    else{
        console.log(res.data.massage)
        return false;
    }
}

export default handleSignup;