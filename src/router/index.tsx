import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteAdd from "../components/noteAdd/NoteAdd";
import NoteList from "../components/noteList/NoteList";
import SignIn from "../components/signIn/SignIn";
import SignUp from "../components/signUp/SignUp";
const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/noteList" element={<NoteList />} />
                    <Route path="/noteAdd" element={<NoteAdd />} />
                    <Route path="/noteAdd/:id" element={<NoteAdd />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};
export default Router;
