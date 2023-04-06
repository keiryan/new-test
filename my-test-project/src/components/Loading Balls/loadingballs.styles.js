import styled from "styled-components";

export const ContainerForBalls = styled.div`
  display: flex;`;

export const BallAndShadowContainer = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
`;

export const Ball = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50px;
  background-color: pink;
  animation: bounce 0.5s infinite alternate;
  animation-delay: ${(props) => props.index * 0.2}s;
  margin: 0px 5px;
  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-6px);
    }
  }
`;