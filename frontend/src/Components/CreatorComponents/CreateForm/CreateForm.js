import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MCQ from "../Elements/MCQ.js";
import ShortAns from "../Elements/ShortAns.js";
import Date from "../Elements/Date.js";
import Heading from "../Elements/Heading.js";
import Email from "../Elements/Email.js";
import LongAns from "../Elements/LongAns.js";
import Phone from "../Elements/Phone.js";
import Time from "../Elements/Time.js";
import formApi from "../../API/FormData.js";
import FileUpload from "../Elements/FileUpload.js";
import Address from "../Elements/Address.js";
import Checkbox from "../Elements/Checkbox.js";
import Navbar from "../Navbar/Navbar.js";
import Preview from "../Preview/Preview.js";
import "./CreateForm.css";

const CreateForm = (props) => {
    const navigate=useNavigate();
    const location=useLocation();
    const {email}=useParams();

    const [showPreview,setShowPreview]=useState(false);
    const [fields, setFields] = useState([])
    const [name, setName] = useState("")
    const [formConfiguration,setFormConfiguration] =useState([]);

    const accessToken = localStorage.getItem(email);

    var formID=""

    if(location.state) formID=location.state.formID

    var elements = [
        { name: "Email" },
        { name: "Date" },
        { name: "Time" },
        { name: "Address" },
        { name: "Phone" },
        { name: "MCQ" },
        { name: "CheckboxAnswer" },
        { name: "short_ans" },
        { name: "LongAnswer" },
        { name: "FileUpload" },
    ];

    var MCQCount = 0;
    var ShortAnsCount = 0;
    var DateCount = 0;
    var EmailCount = 0;
    var LongAnsCount = 0;
    var PhoneCount = 0;
    var TimeCount = 0;
    var FileUploadCount = 0;
    var AddressCount = 0;
    var CheckBoxCount = 0;

    const getFormData = async () => {
        if (formID) {

            const apiRes = await formApi.get("/getFormByID", {
                params: { formID: formID, email: email },
                headers: { 'authorization': accessToken }
            });

            if (apiRes.data.status === false) return alert("Something went wrong!");

            setName(apiRes.data.data.formName)

            apiRes.data.data.fields.map((form) => {

                if (form.type === 'MCQ') {
                    setFields([...fields,
                    <MCQ
                        id={form.id}
                        label={form.label}
                        options={form.options}
                        addFormConfiguration={addFormConfiguration}
                    />]);

                    MCQCount = MCQCount + 1;
                }
                else if (form.type === "short_ans") {
                    setFields([...fields,
                    <ShortAns
                        id={form.id}
                        label={form.label}
                        addFormConfiguration={addFormConfiguration}
                    />,
                    ]);

                    ShortAnsCount = ShortAnsCount + 1;
                }
                else if (form.type === "Date") {
                    setFields([...fields,
                    <Date
                        id={form.id}
                        label={form.label}
                        addFormConfiguration={addFormConfiguration}
                    />,
                    ]);

                    DateCount = DateCount + 1;
                }
                else if (form.type === "Email") {
                    setFields([...fields,
                    <Email
                        id={form.id}
                        label={form.label}
                        addFormConfiguration={addFormConfiguration}
                    />,
                    ]);

                    EmailCount = EmailCount + 1;
                }
                else if (form.type === "LongAnswer") {
                    setFields([...fields,
                    <LongAns
                        id={form.id}
                        label={form.label}
                        addFormConfiguration={addFormConfiguration}
                    />,
                    ]);

                    LongAnsCount = LongAnsCount + 1;
                }
                else if (form.type === "Phone") {
                    setFields([...fields,
                    <Phone
                        id={form.id}
                        label={form.label}
                        addFormConfiguration={addFormConfiguration}
                    />,
                    ]);

                    PhoneCount = PhoneCount + 1;
                }
                else if (form.type === "Time") {
                    setFields([...fields,
                    <Time
                        id={form.id}
                        label={form.label}
                        addFormConfiguration={addFormConfiguration}
                    />,
                    ]);

                    TimeCount = TimeCount + 1;
                }
                else if (form.type === "Address") {
                    setFields([...fields,
                    <Address
                        id={form.id}
                        label={form.label}
                        addFormConfiguration={addFormConfiguration}
                    />,
                    ]);

                    AddressCount = AddressCount + 1;
                }
                else if (form.type === "FileUpload") {
                    setFields([...fields,
                    <FileUpload
                        id={form.id}
                        label={form.label}
                        addFormConfiguration={addFormConfiguration}
                    />,
                    ]);

                    FileUploadCount = FileUploadCount + 1;
                }
                else if (form.type === "CheckboxAnswer") {
                    setFields([...fields,
                    <Checkbox
                        id={form.id}
                        label={form.label}
                        options={form.options}
                        addFormConfiguration={addFormConfiguration}
                    />,
                    ]);

                    CheckBoxCount = CheckBoxCount + 1;
                }
            });
        }
    };

    useEffect(()=>{
        getFormData();
    },[])


    const addFormConfiguration = (field) => {
        var objIndex = formConfiguration.findIndex(
            (obj) => obj.id === field.id
        );

        if (objIndex === -1) {
            formConfiguration.push(field);
        } else {
            formConfiguration[objIndex] = field;
        }
    };

    const handlePublish = async () => {
        console.log("Fields :");
        console.log(formConfiguration);

        const querRes = await formApi.post("/saveform", {
            formConf: {
                formID: formID,
                formName: name,
                fields: formConfiguration,
            },
            email: email,
        },{ headers: { 'Authorization': accessToken } });

        if (querRes.data.status === true) {
            console.log(props)
            navigate(`/${email}/publish`, {state: { formID: querRes.data.data.formID }});
        } 
        else {
            console.log(querRes.data)
            alert(querRes.data.massage);
        }
    };

    //Drag and drop handlers
    const onDragStart = (ev, id) => {
        ev.dataTransfer.setData("fieldID", id);
    };

    const onDragOver = (ev) => {
        ev.preventDefault();
    };

    const onDrop = (ev) => {
        if (ev.dataTransfer.getData("fieldID") === "MCQ") {
            setFields([...fields,
            <MCQ
                id={`MCQ_${MCQCount}`}
                label={""}
                options={["Option 1"]}
                addFormConfiguration={addFormConfiguration}
            />,
            ]);

            MCQCount = MCQCount + 1;
        }
        else if (ev.dataTransfer.getData("fieldID") === "short_ans") {
            setFields([...fields,
            <ShortAns
                id={`ShortAns_${ShortAnsCount}`}
                label={""}
                addFormConfiguration={addFormConfiguration}
            />,
            ]);

            ShortAnsCount = ShortAnsCount + 1;
        }
        else if (ev.dataTransfer.getData("fieldID") === "Date") {
            setFields([...fields,
            <Date
                id={`Date_${DateCount}`}
                label={""}
                addFormConfiguration={addFormConfiguration}
            />,
            ]);
            DateCount = DateCount + 1;
        }
        else if (ev.dataTransfer.getData("fieldID") === "Email") {
            setFields([...fields,
            <Email
                id={`Email_${EmailCount}`}
                label={""}
                addFormConfiguration={addFormConfiguration}
            />,
            ]);
            EmailCount = EmailCount + 1;
        }
        else if (ev.dataTransfer.getData("fieldID") === "LongAnswer") {
            setFields([...fields,
            <LongAns
                id={`LongAns_${LongAnsCount}`}
                label={""}
                addFormConfiguration={addFormConfiguration}
            />,
            ]);
            LongAnsCount = LongAnsCount + 1;
        }
        else if (ev.dataTransfer.getData("fieldID") === "Phone") {
            setFields([...fields,
            <Phone
                id={`Phone_${PhoneCount}`}
                label={""}
                addFormConfiguration={addFormConfiguration}
            />,
            ]);
            PhoneCount = PhoneCount + 1;
        }
        else if (ev.dataTransfer.getData("fieldID") === "Time") {
            setFields([...fields,
            <Time
                id={`Time_${TimeCount}`}
                label={""}
                addFormConfiguration={addFormConfiguration}
            />,
            ]);
            TimeCount = TimeCount + 1;
        }
        else if (ev.dataTransfer.getData("fieldID") === "FileUpload") {
            setFields([...fields,
            <FileUpload
                id={`FileUpload_${FileUploadCount}`}
                label={""}
                addFormConfiguration={addFormConfiguration}
            />,
            ]);
            FileUploadCount = FileUploadCount + 1;
        }
        else if (ev.dataTransfer.getData("fieldID") === "Address") {
            setFields([...fields,
            <Address
                id={`Address_${AddressCount}`}
                label={""}
                addFormConfiguration={addFormConfiguration}
            />,
            ]);
            AddressCount = AddressCount + 1;
        }
        else if (ev.dataTransfer.getData("fieldID") === "CheckboxAnswer") {
            setFields([...fields,
            <Checkbox
                id={`Checkbox_${CheckBoxCount}`}
                label={""}
                options={["Checkbox 1"]}
                addFormConfiguration={addFormConfiguration}
            />,
            ]);
            CheckBoxCount = CheckBoxCount + 1;
        }
    };

    var allElements = [];

    elements.forEach((el) => {
        allElements.push(
            <button
                className="elements-btn"
                key={el.name}
                onDragStart={(e) => onDragStart(e, el.name)}
                draggable
            >
                {el.name}
            </button>
        );
    });

    return (
        <div>
            <Navbar email={email}/>
            
            {!showPreview?<div className="container-root1">
                <div className="container-drag">
                    <div className="task-header">
                        <h2>All Elements</h2>
                    </div>

                    <div
                        className="elementList"
                        onDragOver={(e) => onDragOver(e)}
                        onDrop={(e) => {
                            onDrop(e);
                        }}
                    >
                        {allElements}
                    </div>
                </div>

                {/* right container */}
                <div className="container-right" id="container-right">
                    <div className="task-header">
                        <h2>Form</h2>
                    </div>
                    <Heading name={name} key={name} addFormName={setName}/>

                    <ul>
                        {fields.map((el, index) => {
                            return (
                                <li className="added-elements" key={index}>
                                    {el}
                                </li>
                            );
                        })}
                    </ul>

                    <div
                        className="droppable-area"
                        onDragOver={(e) => onDragOver(e)}
                        onDrop={(e) => onDrop(e)}
                        id="target-div"
                    >
                        <div className="drag-text">Drag Here</div>
                    </div>
                    <div className="publish-preview-btn">
                        <div className="publish-btn-div">
                            <button className="publish-btn" onClick={handlePublish}>
                                Publish{" "}
                            </button>
                        </div>

                        <div className="publish-btn-div">
                            <button className="publish-btn" onClick={(e)=>{
                                console.log("here")
                                setShowPreview(true);
                            }}>
                                Preview{" "}
                            </button>
                        </div>
                    </div>
                </div>
            </div> : <div> <Preview setShowPreview={setShowPreview} formConf={formConfiguration}/> </div>}
        </div>
    );
}


export default CreateForm;
