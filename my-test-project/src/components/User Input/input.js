import React, { useState } from "react";
import {
    StyledInput,
    StyledForm,
    SendArrowContainer,
    SendArrow,
} from "./input.styles";

export default function UserInput({ addMessage }) {
    const [input, setInput] = useState("");

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addMessage({ content: input, role: 'user'});
        setInput("");
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <StyledInput onChange={handleChange} value={input} />
            <SendArrowContainer onClick={handleSubmit}>
                <SendArrow />
            </SendArrowContainer>
        </StyledForm>
    );
}
