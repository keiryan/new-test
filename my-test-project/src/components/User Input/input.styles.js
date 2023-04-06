import styled from "styled-components";

export const StyledInput = styled.input`
  height: 100%;
  width: 100%;
  color: #fff;
  background-color: transparent;
  outline: none;
  border: none;
  padding: 0.5rem;
  font-size: 0.8rem;
`;

export const StyledForm = styled.form`
  margin: 10px;
  background-color: #282c34;
  border-radius: 4px;
  padding: 0.2rem;
  display: flex;
  align-items: center;
`;

export const SendArrowContainer = styled.div`
  padding: 0 0.5rem;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  :hover > svg {
    transform: rotate(-40deg);
  }
  :active {
    scale: 0.9;
  }
`;

export function SendArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="#fff"
      strokeWidth="1.5"
      className="w-6 h-6"
      viewBox="0 0 24 24"
      width="24"
      style={{ transition: "transform 0.2s ease-in-out" }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
      ></path>
    </svg>
  );
}
