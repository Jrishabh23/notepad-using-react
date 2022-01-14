import { useEffect, useState } from "react";
import Button from "../../components/subComponent/button/Button";
import Input from "../../components/subComponent/input/Input";
import { Config } from "../../config/constant";
import { EncodeImage } from "../../utility/image_convertor";
import Validators from "../../utility/validations";
import "./SignUp.css";
import { useNavigate } from "react-router";
import { getData } from "../../utility/network/storage";
const ERROR_MSG: any = {
    name: "",
    userName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    avatar: "",
};
const SignUp = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState<any>({
        name: "",
        userName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        avatar: "",
    });

    useEffect(() => {
        const data = getData("current");
        if (data) navigate("/noteList");
    }, []);

    const checkValidation = (name: any): boolean => {
        if (userDetails[name].match(Validators[name])) {
            ERROR_MSG[name] = "";
            return false;
        }
        ERROR_MSG[name] =
            name === "password"
                ? `Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters`
                : name === "confirmPassword"
                ? "Password and Confirm Password did not match"
                : `Please enter valid ${name}`;
        return true;
    };

    const _is_password_match = () => {
        if (userDetails["password"] !== userDetails["confirmPassword"]) {
            ERROR_MSG["confirmPassword"] =
                "Password and Confirm Password did not match";
            return true;
        }
        return false;
    };

    const onSubmit = (): any => {
        if (
            checkValidation("name") ||
            checkValidation("userName") ||
            checkValidation("email") ||
            checkValidation("mobile") ||
            checkValidation("password") ||
            checkValidation("confirmPassword") ||
            _is_password_match()
        ) {
            const n = userDetails["name"];
            setUserDetails({ ...userDetails, name: n });
            return;
        }
        localStorage.setItem(
            userDetails["email"].toLowerCase(),
            JSON.stringify(userDetails)
        );
        navigate("/");
    };

    /**
     * Update input value
     */
    const updateDetails = (e: any) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };
    /**
     * @desc Image validation and save
     */
    const encodeAvatar = (e: any) => {
        const { value } = e.target;
        /**
         * @desc Check validation if file type jpg, jpeg, png
         */
        if (!Validators["avatar"].exec(value)) {
            ERROR_MSG["avatar"] = "File type only jpg,jpeg,png";
            setUserDetails({ ...userDetails });
            return;
        }
        /**
         * @desc handle error if file size not exceed 150 kb
         */
        const files = e.target.files[0];
        if (files.size >= Number(Config["FILE_MAX_SIZE"])) {
            ERROR_MSG["avatar"] = "File size not exceed 150KB";
            console.log(ERROR_MSG);
            setUserDetails({ ...userDetails });
            return;
        }
        /**
         * @desc Convert Image into Base64
         */
        EncodeImage(files).then(
            (res) => {
                setUserDetails({ ...userDetails, [e.target.name]: res });
            },
            (err) => console.log(err)
        );
    };

    return (
        <>
            <div className="registration">
                <h1>Sign up</h1>
                <Input
                    name="avatar"
                    type="file"
                    handleEvent={encodeAvatar}
                    label="Profile"
                />
                {/* <p className="error">{ERROR_MSG["avatar"]}</p> */}

                <Input
                    name="name"
                    handleEvent={updateDetails}
                    value={userDetails.name}
                    label="Name"
                    error="false"
                    placeHolder="Enter your name"
                    errorMessage={ERROR_MSG["name"]}
                />
                <Input
                    name="userName"
                    handleEvent={updateDetails}
                    label="Username"
                    errorMessage={ERROR_MSG["userName"]}
                    value={userDetails.userName}
                />
                <Input
                    name="email"
                    type="email"
                    handleEvent={updateDetails}
                    label="Email"
                    errorMessage={ERROR_MSG["email"]}
                    value={userDetails.email}
                />
                <Input
                    name="mobile"
                    type="tel"
                    handleEvent={updateDetails}
                    label="Mobile Number"
                    errorMessage={ERROR_MSG["mobile"]}
                    value={userDetails.mobile}
                />
                <Input
                    name="password"
                    type="password"
                    handleEvent={updateDetails}
                    label="Password"
                    errorMessage={ERROR_MSG["password"]}
                    value={userDetails.password}
                />
                <Input
                    name="confirmPassword"
                    type="password"
                    handleEvent={updateDetails}
                    label="Confirm Password"
                    errorMessage={ERROR_MSG["confirmPassword"]}
                    value={userDetails.confirmPassword}
                />
                <Button type="submit" onClick={onSubmit} />
                <div>
                    Already account? <a href="/">SignIn</a>
                </div>
            </div>
        </>
    );
};
export default SignUp;
