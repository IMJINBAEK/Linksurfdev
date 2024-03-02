import React, { useState } from "react";
import { auth } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Error, Input, Switcher, Title, Wrapper, Form} from "../components/authComponents";
import GoogleButton from "../components/googlebtn";
import ResetPassword from "../components/resetPassword";

export default function Login(){
    const navigate= useNavigate();
    const [isLoading, setLoading]=useState(false);
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [error, setError]=useState("");
    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {target:{name, value},}=e;
        if(name==="email"){
            setEmail(value);
        }
        else if(name==="password"){
            setPassword(value);
        }
    }
    const onSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError("");
        if(isLoading || email==="" || password==="") return;
        try{
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
           navigate("/");
        }
        catch(e){
            if(e instanceof FirebaseError){
                setError(e.message);
            }
        }
        finally{
            setLoading(false);
        }
        console.log(email, password);
    }
    return (
        <Wrapper>
            <Title>Log into Linksurf</Title>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required/>
                <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required/>
                <Input type="submit" value={isLoading? "Loading..." : "Log in"} />
            </Form>
            {error!==""? <Error>{error}</Error> : null}
            <GoogleButton />
            <Switcher>
                Don't have an Account?{""}
                <Link to="/createAccount">Create one &rarr;</Link>
            </Switcher>
            <ResetPassword />
        </Wrapper>

    );
}