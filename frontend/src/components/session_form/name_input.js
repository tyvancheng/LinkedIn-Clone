import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useDispatch } from "react-redux";
import { useState } from "react";
import { createUser } from "../../store/session";


export const NameInput = (Email, Password, val = false) => {
    const history = useHistory()
    if (val === false) history.push("/signup")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch()

    setEmail(Email)
    setPassword(Password)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
    
           dispatch(createUser({ email, password, first_name: firstName, last_name: lastName }))
            .catch(async (res) => {
            let data;
            try {
              // .clone() essentially allows you to read the response body twice
              data = await res.clone().json();
            } catch {
              data = await res.text(); // Will hit this case if, e.g., server is down
              
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
            
          });
        // } else {
        //     return setErrors(['Password field must be the same as the Password field']);
        }
}