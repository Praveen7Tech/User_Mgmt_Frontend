
export const validateForm =(name,email,password,isLogin=true)=>{
    const emailValid = /^\S+@\S+\.\S+$/.test(email);
    const passwordValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);
    const nameValid = isLogin ? /^[A-Za-z\s\-.']+$/.test(name) : true

    return {
        nameError: isLogin && !nameValid ? "Name not valid" : null,
        emailError: !emailValid ? "Email not valid" : null,
        paswordError: !passwordValid ? "Password not valid" : null,
    }
}
