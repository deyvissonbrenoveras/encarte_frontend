import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
    :root{
        --primary-color: rgb(237, 47, 87);
    }
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }
    *:focus {
        outline: 0;
    }
    html, body, #root {
        background: #fff;
        height: 100%;
    }
    body{
        -webkit-font-smoothing: antialiased;
    }
    body, input, button {
        font: 14px 'Roboto', sans-serif;
    }
    a {
        text-decoration: none;
    }
    button {
        cursor: pointer;
    }
    li {
        list-style: none;
    }
`;
