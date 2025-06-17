
export const validateForm =(name,email,password)=>{
    const emailValid = /^\S+@\S+\.\S+$/.test(email);
    const passwordValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);
    const nameValid = /^[A-Za-z\s\-.']+$/.test(name) 

    return {
        nameError: !nameValid ? "Name not valid" : null,
        emailError: !emailValid ? "Email not valid" : null,
        paswordError: !passwordValid ? "Password not valid" : null,
    }
}
