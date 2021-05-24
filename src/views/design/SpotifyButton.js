import styled from "styled-components";

export const SpotifyButton = styled.button`
    width: auto;
    height: 15%;
    background: transparent;
    border: none;
    cursor: ${props => (props.disabled ? "default" : "pointer")};
    margin-bottom: 3%;
`