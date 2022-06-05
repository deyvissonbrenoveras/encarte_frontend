import styled from 'styled-components';
import { darken } from 'polished'

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;

    img {
        width: 30%;
        height: 15%;
    }

    h1 {
        font-size: 1.5rem;
        color: #636e72;
    }

    button {
        padding: .7rem 2rem;
        font-size: .9rem;
        display: flex;
        align-items: center;
        background-color: #ed2f54;
        color: #ffff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.1s;
        &:hover {
            background: ${darken(0.3, "#ed2f54")};
        }

        span {
            font-weight: 700;
        }
    }
`;