import React, { useState } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import { Error, Input, Title, Wrapper, Form} from "../components/authComponents";
export default function EmailResetPassword(){
    const navigate= useNavigate();
    const [isLoading, setLoading]=useState(false);
    const [email, setEmail]=useState("");
    const [error, setError]=useState("");
    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {target:{value},}=e;
            setEmail(value);
    }
    const onSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError("");
        if(isLoading || email==="") return;
        try{
            setLoading(true);
            await sendPasswordResetEmail(auth, email);
           navigate("/login");
        }
        catch(e){
            if(e instanceof FirebaseError){
                setError(e.message);
            }
        }
        finally{
            setLoading(false);
        }
        console.log(email);
    }
    return (
        <Wrapper>
            <Title>send Email to Reset</Title>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} value={email} placeholder="Your registered Email" type="email" required/>
                <Input type="submit" value={isLoading? "Loading..." : "send"} />
            </Form>
            {error!==""? <Error>{error}</Error> : null}
        </Wrapper>

    );
}