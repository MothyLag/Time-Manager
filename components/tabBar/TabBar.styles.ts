import styled from "styled-components/native"

interface TabItemProps{
    selected: boolean;
}

export const TabBarContainer = styled.View`
    width: 100%;
    height: 9%;
    flex-direction: row;
    background-color: white;
    display: flex;
    justify-content: space-between;
`

export const TabItem = styled.View`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props:TabItemProps)=>props.selected ? "#1F1E1E" :"white"};
    ` 