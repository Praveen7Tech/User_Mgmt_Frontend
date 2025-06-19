
export const validateAdmin=(email, password)=>{
    const emailValid = /^\S+@\S+\.\S+$/.test(email);
    const passwordValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);

    return {
        emailError : !emailValid ? "Email not valid" : null,
        passwordError : !passwordValid ? "Password not valid" : null
    }
}