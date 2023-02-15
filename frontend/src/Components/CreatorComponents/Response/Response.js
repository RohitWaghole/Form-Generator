import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { CSVLink } from "react-csv";
import Navbar from "../Navbar/Navbar";
import resApi from "../../API/ResData";
import { useState } from "react";

const Response = () => {

    const [responses, setResponses] = useState([]);
    const [flag, setFlag] = useState(false)
    const [csvReport, setCSVReport] = useState({});

    const { email, id } = useParams();
    const accessToken = localStorage.getItem(email);


    const headers = []

    const ans = [];


    const getResponses = async () => {
        const apiRes = await resApi.get('/getResponsesByID', { params: { formID: id }, headers: { 'authorization': accessToken } })
    if (apiRes.data.status === true) {
        setResponses(apiRes.data.data)
    }

    else {
        alert(apiRes.data.massage)
    }
    console.log(apiRes.data.data)

    apiRes.data.data[0].map((response, index) => {
        headers.push({ label: response.label, key: response.label })
    })

    apiRes.data.data.map((res) => {
        const temp = {}
        res.map((res2) => {
            var key = res2.label
            temp[key] = res2.ans;
        })
        ans.push(temp)
    })

    setCSVReport({
        data: ans,
        headers: headers,
        filename: `responses.csv`
    });
    console.log("here :")
    console.log(csvReport)
    setFlag(true);
}

useEffect(() => {
    getResponses();
}, [])

return (
    <div style={{ textAlign: "center" }}>
        <Navbar email={email} />
        <h1>Responses</h1>
        <hr style={{ width: "100%" }} ></hr>
        <div>
            {
                responses?.map((response) => {
                    return <div>
                        {
                            response?.map((field) => {
                                return <div> <div>{field.label}</div> <div>{field.ans}</div> <br></br> </div>
                            })
                        }
                        <hr style={{ width: "100%" }}></hr>
                    </div>

                })
            }

            {
                flag ? <CSVLink {...csvReport}>Export to CSV</CSVLink> : <></>
            }


        </div>
    </div>
)
}


export default Response;