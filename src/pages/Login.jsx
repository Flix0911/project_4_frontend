// import form
import Form from "../components/Form"

function Login(){
    // pass 2 props ~ our form
    return<Form route="/api/token/" method="login" />
}

export default Login