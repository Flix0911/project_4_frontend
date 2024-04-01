import Form from "../components/Form"


function Register(){
    // pass 2 props ~ our form
    return<Form route="/api/user/register/" method="register" />
}

export default Register