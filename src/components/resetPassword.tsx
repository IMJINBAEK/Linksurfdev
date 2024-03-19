import styled from "styled-components";
import { Link } from "react-router-dom";
const SendEmail=styled.span`
margin-top: 20px;
a {
    color: #1d9bf0;
}
`;
export default function ResetPassword(){
    return <SendEmail>Forgot your password? <Link to="/emailResetPassword">Reset with resgisted Email</Link></SendEmail>
};