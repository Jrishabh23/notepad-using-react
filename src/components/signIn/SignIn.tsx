import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/subComponent/button/Button";
import Input from "../../components/subComponent/input/Input";
import { UserContext } from "../../context/context";
import { getData, setData } from "../../utility/network/storage";
import Validators from "../../utility/validations";
const ERROR_MSG: any = {
    email: "",
    password: "",
};
const SignIn = () => {
    const navigator = useNavigate();
    const { loginUser, setLoginUser } = useContext(UserContext);
    const [userDetails, setUserDetails] = useState<any>({
        email: "",
        password: "",
    });

    useEffect(() => {
        // console.log(loginUser);
        // if (loginUser) {
        //     console.log("bye");
        //     navigator("/noteList");
        // }
        console.log("hello");
    }, []);

    const checkValidation = (name: any): boolean => {
        if (userDetails[name].match(Validators[name])) {
            ERROR_MSG[name] = "";
            return false;
        }
        ERROR_MSG[name] = `Please enter valid ${name}`;
        return true;
    };

    const onSubmit = (): any => {
        if (checkValidation("email") || checkValidation("password")) {
            const n = userDetails["email"];
            setUserDetails({ ...userDetails, email: n });
            return;
        }
        const response = getData(userDetails["email"].toLowerCase());
        if (!response) {
            alert("Your id not found");
            return;
        }
        if (response["password"] === userDetails["password"]) {
            setData("current", { email: userDetails["email"] });
            setLoginUser(userDetails["email"]);
            navigator("/noteList");
            return;
        }
        alert("Please enter correct credential");
    };

    /**
     * Update input value
     */
    const updateDetails = (e: any) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };
    return (
        <>
            <div className="registration">
                <h1>Sign up</h1>
                <Input
                    name="email"
                    handleEvent={updateDetails}
                    label="Email"
                    placeHolder="Enter your Email"
                    errorMessage={ERROR_MSG["email"]}
                    value={userDetails?.email}
                />
                <Input
                    name="password"
                    type="password"
                    handleEvent={updateDetails}
                    label="Password"
                    placeHolder="Enter your Password"
                    errorMessage={ERROR_MSG["password"]}
                    value={userDetails?.password}
                />
                <Button type="submit" onClick={onSubmit} />
                <div>
                    Not account? <a href="/sign-up">SignIn</a>
                </div>
            </div>
        </>
    );
};
export default SignIn;
