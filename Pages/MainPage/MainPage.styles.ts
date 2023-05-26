import styled from "styled-components/native"

export const MainContainer = styled.View`
    display: flex;
    flex-direction: column;
    background-color: #1F1E1E;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
`;

export const TitleText = styled.Text`
    color: black;
    font-size: 25px;
    font-weight: bold;
`;

export const LogoContainer = styled.View`
    width: 100%;
    height: 8%;
`

export const Logo = styled.Image`
    width: 200px;
    height: 100%;
`

export interface StandarClockProps{
    status:"active"|"inactive"|"disabled"|"available";
};

export const StandardClock = styled.View`
    width: 80%;
    height: 70px;
    background-color: ${(props:StandarClockProps)=>{
     switch(props.status){
        case "active":
            return "#D9B844"
        case "disabled":
            return "#3C3C3C"
        case "inactive":
            return "#A44C4C"
        case "available":
            return "#58A44C"
     }
    }};
    border-radius: 3px;
    margin-top: 39px;
    transition: all 0.3s;
    display: flex;
    flex-direction: row;
    
`; 

export const ClockName = styled.Text`
    display: flex;
    color: white;
    font-size: 25px;
    font-weight: light;
    width: 50%;
    height: 100%;
    align-items: flex-end;
    vertical-align: bottom;
    
`
export const ClockTime = styled.Text`
    color: white;
    font-size: 30px;
    font-weight: bold;
    width:50%;
    height:100%;
    text-align: right;
    padding-right: 20px;
`