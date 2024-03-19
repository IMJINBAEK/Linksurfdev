import styled from "styled-components";
import { IBoard } from "./boardList";
import { auth, db, storage } from "../routes/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";

const Wrapper=styled.div`
display: grid;
grid-template-columns: 3fr 1fr;
padding: 20px;
border: 1px solid rgba(255,255,255,0.5);
border-radius: 15px;
margin: 20px;
`;
const Column=styled.div``;
const Photo=styled.img`
width: 250px;
height: 400px;
border-radius: 15px;
`;
const Username=styled.span`
font-weight: 600;
font-size: 15px;
`;
const Payload=styled.p`
margin: 10px 0px;
font-size: 18px;
`;
const DeleteButton=styled.button`
background-color: tomato;
color: white;
font-weight: 600;
border: 0;
font-size:12px;
padding: 5px 10px;
text-transform: uppercase;
border-radius: 5px;
cursor:pointer;
`;

const EditButton=styled.button`
background-color: green;
color: white;
font-weight: 600;
border: 0;
font-size:12px;
padding: 5px 10px;
text-transform: uppercase;
border-radius: 5px;
cursor:pointer;
`;

export default function Board({username, photo, explaining, userId, id} : IBoard){
    const user=auth.currentUser;
    const [isEdit, setIsEdit]=useState(false);
    const onDelete=async() => {
        const ok=confirm("Are you sure you want to delete this board?");

        if(!ok || user?.uid!==userId) return;
        try{
            await deleteDoc(doc(db, "Boards", id));
            if(photo){
                const photoRef=ref(storage, `Boards/${user.uid}/${id}`);
                await deleteObject(photoRef);
            }
        }catch(e){
            console.log(e);
        }finally{

        }
    };
    return <Wrapper>
        <Column>
        <Username>{username}</Username>
        <Payload>{explaining}</Payload>
        {user?.uid===userId?
        <><DeleteButton onClick={onDelete}>Delete</DeleteButton><EditButton>Edit</EditButton></>
        :null}
        </Column>
        <Column>
        <Photo src={photo} />
        </Column>
    </Wrapper>
}