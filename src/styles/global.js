import { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';

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
        height: 100vh
    }
    body{
        -webkit-font-smoothing: antialiased;
        background: #e3e3e3;
        background: -webkit-linear-gradient(to right, #ffffff, #e3e3e3);
        background: linear-gradient(to right, #ffffff, #e3e3e3);
    }
    body, input, button, textarea, select {
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
    ::-webkit-scrollbar {
        width: 6px;
        height: 2px;
        
    }
    ::-webkit-scrollbar-track {        
        margin: 20px 0;
        background: none;
    }
    ::-webkit-scrollbar-thumb {     
        height: 10px;  
        background: var(--primary-color);
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: ${darken(0.1, 'rgb(237, 47, 87)')};
    }
`;
