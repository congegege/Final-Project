import { useContext, useEffect, useState} from "react";
import { useSearchParams } from "react-router-dom";
import { Link  } from "react-router-dom";
import styled from "styled-components";
import { RecipesContext } from "../Context/RecipesContext";
import SideBar from "./SideBar";



const CategoryResult = () => {
    const [categoryRecipes, setCategoryRecipes] = useState(null)
    const [searchParams,setSearchParams] = useSearchParams(window.location.search);
    const query = searchParams.toString();
    const queryList = Array.from(searchParams.values());
    const {setIsClicked} = useContext(RecipesContext)
    

    useEffect(()=>{
        fetch(`/api/categories/recipes?${query}`)
        .then(res=>res.json())
        .then(resData=>setCategoryRecipes(resData.data))
    },[query])


    return (
        <Container>
        <SideBar />
        <TitleSection>
            <QueryTitle>
        {queryList.length == 0 ? 
        <span>All</span> : 
        queryList.map((query)=>{
            return <span key={query}> {query}</span>
        })}
        </QueryTitle>
        <FilterButton onClick={()=>setIsClicked(true)} >Filters</FilterButton>
        </TitleSection>
        <Wrapper>
            
        {categoryRecipes && categoryRecipes.map((recipe,index)=>{
            return(
                <RecipeSection key={index}>
                    <Link to={`/recipes/${recipe.idDrink}`}><RecipePicture src={recipe.strDrinkThumb} /></Link>
                    <DrinkName>{recipe.strDrink}</DrinkName>
                </RecipeSection>
            )
            
        })}
        </Wrapper>
        </Container>
        
    )
}

const FilterButton = styled.button`
font-size: 20px;
font-family: var(--font-category-heading);
background-color: white;
color: darkgray;

&:hover{
    cursor: pointer;
    color: black;
}
`

const TitleSection = styled.div`
    display: flex;
    flex-direction: column;
`

const QueryTitle = styled.span`
    font-family: var(--font-query-header);
    text-align: center;
    margin: 20px 5px;
    font-size: 70px;
`

const DrinkName = styled.div`
    text-align: center;
`

const Container = styled.div`
    width: 100%;

`

const Wrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
flex-wrap: wrap;
`

const RecipeSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5%;
`

const RecipePicture = styled.img`
    border-radius: 14px;
    width: 600px;

`


export default CategoryResult;