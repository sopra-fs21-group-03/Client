import styled from "styled-components";

export const SpotifyButton = styled.button`
    width: auto;
    height: auto;
    background: transparent;
    border: none;
    cursor: ${props => (props.disabled ? "default" : "pointer")};
`