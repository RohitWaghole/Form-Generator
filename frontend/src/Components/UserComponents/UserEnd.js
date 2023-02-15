import React from 'react'
import formApi from "../API/FormData";
import resApi from '../API/ResData.js'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


const UserEnd = (props) => {

    const [form, setForm] = useState([])

    const { id } = useParams()
    const formID = id

    const getForm = async () => {

        const apiRes = await formApi.get('/userEnd/getFormByID', { params: { formID: formID } })

        setForm(apiRes.data.data.fields)
    }

    const handleAnswerChange = (e) => {

        var objIndex = form.findIndex(
            (obj) => obj.id === e.target.id
        );

        form[objIndex].ans = e.target.value;
    }

    const handleOptionChange = (e) => {

        var objIndex = form.findIndex(
            (obj) => obj.id === e.target.name
        );

        form[objIndex].ans = e.target.value;
    }

    const hanadleSubmit = async (e) => {
        e.preventDefault();
        const apiRes = await resApi.post('/saveresponse', { data: form, formID: formID })

        if (apiRes.data.status === true) {
            alert(apiRes.data.massage)
        }
    }


    useEffect(() => {
        getForm()
    }, [])

    return (
        <div style={{ marginTop: "20px", marginBottom: "50px", width: "100%", textAlign: "center", margin: "auto" }}>
            <div style={{ marginTop: "20px", marginBottom: "50px", width: "100%", textAlign: "center", margin: "auto" }}>
                <h1>
                    User End
                </h1>
            </div>


            <div>
                {
                    form?.map((field, index) => {
                        return (
                            <div key={index} style={{ marginTop: "20px", width: "100%", textAlign: "center", margin: "auto" }}>
                                <label>{field.label}</label>
                                <br />
                                <br />

                                <br />
                                {
                                    field.options ?
                                        <div>
                                            {
                                                field.options.map((op, index) => {
                                                    return (
                                                        <div key={index} className="element-input">
                                                            <input type="radio" value={op} onChange={(e) => handleOptionChange(e)} name={field.id} />
                                                            <span> </span>
                                                            <label>
                                                                <span className="element-border-style" id={index} placeholder="Enter your option" >{op}</span>
                                                            </label>
                                                        </div>
                                                    );
                                                })
                                            }

                                        </div>
                                        : <div><input type={field.type} id={field.id} onChange={(e) => { handleAnswerChange(e) }} /></div>
                                }
                                <br />
                                <hr style={{ textAlign: "center", margnin: "auto", width: "100%" }}></hr>
                            </div>
                        );
                    })
                }
            </div>
            <button style={{ textAlign: "center", margin: "auto" }} onClick={(e) => { hanadleSubmit(e) }}>Submit</button>
        </div>
    )

}


export default UserEnd