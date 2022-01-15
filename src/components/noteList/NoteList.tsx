import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/context";
import {
    getNoteData,
    logoutUser,
    saveNoteData,
} from "../../utility/network/storage";
import Button from "../subComponent/button/Button";

const NoteList = () => {
    const navigate = useNavigate();
    const [noteList, setNoteList] = useState<[]>([]);
    const { loginUser, setLoginUser } = useContext(UserContext);

    useEffect(() => {
        console.log(loginUser, typeof loginUser);
        if (!loginUser) {
            return navigate("/");
        }

        const data = getNoteData(loginUser);
        console.log(data);
        setNoteList(data);
    }, []);

    const deleteUser = (id: number) => {
        const data = getNoteData(loginUser);
        data.splice(id, 1);
        saveNoteData(loginUser, data);
        setNoteList(data);
    };

    const logoutCurrentUser = () => {
        logoutUser();
        setLoginUser("");
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
