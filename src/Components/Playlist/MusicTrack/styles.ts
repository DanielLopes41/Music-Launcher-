import styled from "styled-components";

export const PlaylistContainer = styled.div`
width: 90vw;
margin-inline:auto;
display: flex;
margin-top: 1rem;
height: 43rem;
flex-direction:column;
display: flex;
`;
export const TuneContainer = styled.div`
display: flex;
gap: 1rem;
overflow: hidden;
overflow-y: auto;  
padding-bottom: 5rem;
margin-top:4rem;
flex-direction: column;
&::-webkit-scrollbar {
    width: 1px;
  }
`
export const IconsContainer = styled.div`
width: 100%;
display: flex;
`
export const Icons = styled.div`
margin-left:auto;
height: 3rem;
width: 10rem;
display: flex;
align-self:end;
gap: 1rem;
`
export const IconButtons = styled.button`
background:transparent;
border: transparent;
`
export const ProgressBarContainer = styled.div`
margin-top:0.4rem;
` 

export const VolumeControllButton = styled.button`
background: transparent;
border: transparent;
`