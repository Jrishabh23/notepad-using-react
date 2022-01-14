import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dateConvertor from "../../utility/network/date_convertor";
import {
    getData,
    getNoteData,
    logoutUser,
    saveNoteData,
} from "../../utility/network/storage";
import Button from "../subComponent/button/Button";

const NoteList = () => {
    const navigate = useNavigate();
    const [noteList, setNoteList] = useState<[]>([]);

    useEffect(() => {
        const loginUser = getData("current");
        if (!loginUser) {
            return navigate("/");
        }
        const data = getNoteData(loginUser["email"]);
        setNoteList(data);
    }, []);

    const deleteUser = (id: number) => {
        const loginUser = getData("current");
        const data = getNoteData(loginUser["email"]);
        data.splice(id, 1);
        saveNoteData(loginUser["email"], data);
        setNoteList(data);
    };

    const logoutCurrentUser = () => {
        logoutUser();
        return navigate("/");
    };

    return (
        <>
            <div className="registration">
                <h1>List of Note</h1>
                <div className="display-flex">
                    <a href="/noteAdd" className="btn">
                        Create Note
                    </a>
                    <button onClick={logoutCurrentUser}> Logout</button>
                </div>
                <ul className="note-list">
                    {noteList.map((item: any, key: any) => {
                        return (
                            <li key={key}>
                                <div>
                                    <div>{item["updated_at"]}</div>
                                    <Link to={`/noteAdd/${key}`}>
                                        {item["title"]}
                                    </Link>
                                </div>
                                <div>
                                    <Button
                                        name="Delete"
                                        type="button"
                                        onClick={deleteUser}
                                    />
                                    <Link
                                        to={`/noteAdd/${key}`}
                                        className="btn"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};
export default NoteList;
