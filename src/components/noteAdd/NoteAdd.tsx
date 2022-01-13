import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
    getData,
    getNoteData,
    logoutUser,
    saveNoteData,
} from "../../utility/network/storage";
import Button from "../subComponent/button/Button";
import Input from "../subComponent/input/Input";

const NoteAdd = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [noteDetails, setNoteDetails] = useState<any>({
        title: "",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
    });

    const updateDetails = (e: any) => {
        const { name, value } = e.target;
        setNoteDetails({ ...noteDetails, [name]: value });
    };

    useEffect(() => {
        const loginUser = getData("current");
        if (!loginUser) {
            return navigate("/");
        }
        const id: any = params["id"];
        if (id) {
            const noteData = getNoteData(loginUser["email"]);
            const currentNote = noteData[id];
            setNoteDetails({
                ...noteDetails,
                title: currentNote["title"],
                description: currentNote["description"],
            });
        }
    }, []);

    /**
     * note:
     */
    const submit = () => {
        const login_user = getData("current");
        const previousData = getNoteData(login_user["email"]);
        if (params["id"]) {
            previousData.splice(params["id"], 1);
        }
        previousData.splice(0, 0, noteDetails);
        saveNoteData(login_user["email"], previousData);
        navigate("/noteList");
    };

    const logoutCurrentUser = () => {
        logoutUser();
        return navigate("/");
    };
    return (
        <>
            <div className="registration">
                <div className="display-flex">
                    <h1>NotePad</h1>
                    <button onClick={logoutCurrentUser} className="btn">
                        {" "}
                        Logout
                    </button>
                </div>
                <div className="">
                    <Input
                        name="title"
                        label="Title"
                        type="text"
                        value={noteDetails["title"]}
                        placeHolder="Enter title"
                        handleEvent={updateDetails}
                    />
                    <div className="form-control-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={noteDetails["description"]}
                            onChange={updateDetails}
                            className="form-control"
                        ></textarea>
                    </div>
                    <div>
                        <Button type="submit" onClick={submit}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default NoteAdd;
