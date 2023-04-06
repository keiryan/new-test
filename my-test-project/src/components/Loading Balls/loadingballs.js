import {
    ContainerForBalls,
    BallAndShadowContainer,
    Ball,
  } from "./loadingballs.styles.js";
  
  const newId = () => Math.random();
  
  export default function LoadingBalls({ ballAmount }) {
    const balls = new Array(ballAmount || 3).fill('ball');
    return (
      <ContainerForBalls>
        {balls.map((ball, index) => {
          return (
            <BallAndShadowContainer key={newId()}>
              <Ball index={index} />
            </BallAndShadowContainer>
          );
        })}
      </ContainerForBalls>
    );
  }
  