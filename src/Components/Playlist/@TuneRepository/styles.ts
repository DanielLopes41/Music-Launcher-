import styled from "styled-components";

export const IconButtons = styled.button`
background:transparent;
border: transparent;
`

export const MainMusicTrack = styled.div`
height: 5rem;
width:90vw;
background: linear-gradient(to left, #0d0d0d, #666666);
border-radius:5px;
display: flex;
justify-content: space-between;
`;

export const MusicData = styled.div`
width:15rem;
display: flex;
gap: 1rem;
align-items: center;
margin-left: 1rem;
`;

export const MusicTrackImage = styled.img`
 height: 4rem;
 width:4rem;
 object-fit: cover;
 background-color: #E3E3E3;
 border-radius:5px;
`;

export const MusicTrackName = styled.p`
font-family: "Baloo 2", serif;
font-style: normal;
color: #000000;
font-size:1rem;
max-width: 30ch;
white-space: nowrap; 
overflow: hidden; 
text-overflow: ellipsis; 
`
export const ConfigButtons  = styled.div`
height: 5rem;
width:10rem;
display: flex;
justify-content: center;
gap: 1rem;
`

export const MusicDataContainer = styled.div`
display: flex;
justify-content: space-between;
`

