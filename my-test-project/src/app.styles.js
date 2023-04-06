import styled from "styled-components";

export const Base = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Container = styled(Base)`
  width: 100vw;
  height: 100vh;
  background-color: #000;
  font-family: 'Poppins', sans-serif;
  overflow: auto;
`;

export const MessagesContainer = styled(Base)`
  width: 100%;
  background-color: #000;
`;

export const UserMessageContainer = styled.div`
display: flex;
justify-content: flex-end;
width: 100%;
`;

export const UserMessage = styled.div`
  position: relative;
  margin: 0.5rem;
  padding: 0.6rem;
  border-radius: 0.5rem 0.5rem 0 0.5rem;
  background-color: #007aff;
  color: #fff;
  text-align: left;
  max-width: 500px;
  font-size: 0.9rem;
  /* &:after {
    content: "";
    position: absolute;
    right: -10px;
    bottom: 0;
    border: 10px solid transparent;
    border-left-color: #007aff;
  } */
`;

export const BotMessageContainer = styled.div`
display: flex;
justify-content: flex-start;
width: 100%;
`;

export const BotMessage = styled(UserMessage)`
  border-radius: 0.5rem 0.5rem 0.5rem 0;
  background-color: #5326FF;
  text-align: left;
`;

export const LoadingBallsMessage = styled(BotMessage)`
  background-color: #1F2229;
`;


export const LoadingBallsContainer = styled(BotMessageContainer)`
    display: ${({ loading }) => (loading ? "flex" : "none")};
  `;


export const AudioHolder = styled.div`
width: 100%;
display: flex;
justify-content: center;`;
