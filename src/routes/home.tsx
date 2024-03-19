import styled from "styled-components";
import BoardList from "../components/boardList";
const Wrapper=styled.div`
display: grid;
gap: 50px;
overflow-y: scroll;
grid-template-rows: 1fr 5fr;
&::-webkit-scrollbar {
	display:none
}
`;
export default function Home(){
    return (<Wrapper>        
        <BoardList />
    </Wrapper>);
}