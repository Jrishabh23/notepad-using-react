const Validators: any = {
    avatar: /(.jpg|.jpeg|.png|.gif)$/i,
    name: /^[A-Za-z]+$/,
    userName: /^[a-zA-z]/g,
    mobile: /^[789][0-9]{9}$/,
    email: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
    password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}/g,
    confirmPassword: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}/g,
};
export default Validators;
