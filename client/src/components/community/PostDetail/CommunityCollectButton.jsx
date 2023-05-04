import { useContext } from "react";
import { RecipesContext } from "../../Context/RecipesContext";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const CommunityCollectButton = ({id,recipeInfo}) =>{

    //to get the user info
    const {state} = useContext(RecipesContext);

    //limit user acces when they are not login
    const {isAuthenticated , loginWithRedirect} = useAuth0();
    
    const handleClick = () =>{
        if(state && recipeInfo){
            const {sub} = state.user;
            const {strDrink,img} = recipeInfo
            fetch("/api/users/communityCollections",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id:id,strDrink:strDrink,img:img,sub:sub
                }),
            })
            .then((res)=>res.json())
            .then((resData)=>{
                console.log(resData.data)
            })
        }
    }

    return <>{isAuthenticated ?<Collect onClick={handleClick}>Collect</Collect> : <Collect onClick={()=>loginWithRedirect()}>Collect</Collect> }</>
}

const Collect =styled.button`
    width: 200px;
    height: 80px;
    align-self: center;
    background-color: transparent;
    border-radius: 50%;
    border: 3px dashed #3a5a40;
    font-size: 23px;
    font-family: var(--font-category);
    color: #6c584c;
    &:hover{
        background-color: #6b9080;
        color: #f5ebe0;
        
    }
    
`

export default CommunityCollectButton;