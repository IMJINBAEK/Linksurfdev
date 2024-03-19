import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../routes/firebase";
import Board from "./board";

export interface IBoard{
    id: string;
    photo: string;
    explaining: string;
    userId: string;
    username: string;
    createdAt: number;
}
const Wrapper=styled.div``;

export default function BoardList(){
    const [boards, setBoard] = useState<IBoard[]>([]);
    const fetchBorads=async()=>{
        const boardsQuery=query(
            collection(db, "Boards"),
            orderBy("createdAt","desc"),
            limit(20)
        );
        const snapshot=await getDocs(boardsQuery);
        const boards=snapshot.docs.map(doc=>{
            const {explaining, createdAt, userId, username, photo}=doc.data();
            return{
                explaining, createdAt, userId, username, photo, id: doc.id,
            };
        });
        setBoard(boards);
    };
    useEffect(()=>{
        fetchBorads();
    },[]);
    return <Wrapper>{boards.map((board) => (<Board key={board.id}{...board} />))}</Wrapper>;
}