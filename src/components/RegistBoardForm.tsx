import { addDoc, collection, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components"
import { auth, db, storage } from "../routes/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form= styled.form`
display:flex;
flex-direction: column;
gap: 10px;
`;

const TextArea= styled.textarea`
border: 2px solid white;
padding: 20px;
border-radius: 20px;
font-size: 16px;
color: white;
background-color: black;
width: 100%;
resize: none;
&::placeholder{
    font-size:16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
&:focus{
    outline: none;
    border-color: #1d9bf0;
}
`;

const AttachFileButton= styled.label`
padding: 10px 0px;
color: #1d9bf0;
text-align: center;
border-radius: 20px; 
border: 1px solid #1d9bf0;
font-size: 14px;
font-weight: 600;
cursor: pointer;
`;

const AttachFileInput= styled.input`
display: none;
`;

const SubmitBtn= styled.input`
padding: 10px 0px;
background-color: #1d9bf0;
color: white;
border-radius: 20px; 
font-size: 16px;
cursor: pointer;
&:hover,
&:active {
    opacity: 0.8;
}
`;

export default function RegistBoardForm(){
    const [isLoading, setIsLoading] = useState(false);
    const [explaining, setExplaining]= useState("");
    const [file, setFile] = useState<File | null>(null);
    const maxSize=10*2024*1024;
    const onChange=(e: React.ChangeEvent<HTMLTextAreaElement>) =>{
        setExplaining(e.target.value);
    };
    const onFileChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const{files}=e?.target;
        if (files && files[0].size > maxSize) {
            alert("Your file size is over 10MB!");
            return;
          }
        if(files && files.length===1){
            setFile(files[0]);
        }
    };
    const onSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const user= auth.currentUser;
        if(!user || isLoading || explaining==="") return;
        try{
            setIsLoading(true);
            const doc = await addDoc(collection(db, "Boards"),{
                explaining,
                createdAt: Date.now(),
                username: user.displayName,
                userId: user.uid,
            });
            if(file){
                const locationRef= ref(storage, `Boards/${user.uid}/${doc.id}`
                );
                const result=await uploadBytes(locationRef, file);
                const url=await getDownloadURL(result.ref);
                await updateDoc(doc, {
                    photo: url,
                });
            }
        } catch(e){
            console.log(e);
        }finally{
            setIsLoading(false);
            setExplaining("");
            setFile(null);
        }
    }
    return (<Form onSubmit={onSubmit}>
        <h1>Regist your Profile</h1>
        <TextArea 
            onChange={onChange}
            value={explaining}
            placeholder="Explain your board" 
        />
        <AttachFileButton htmlFor="file">{file? "Photo added" : "Add photo"} </AttachFileButton>
        <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
        <SubmitBtn type="submit" value={isLoading ? "Posting..." : "Regist Board"}/>
    </Form>
)};