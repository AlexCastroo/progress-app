import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#05204A", contrastText: "#E1E2EF" },
        secondary: { main: "#B497D6", contrastText: "#02020A" },
        background: { default: "#02020A", paper: "#05204A" },
        text: { primary: "#E1E2EF", secondary: "#BFACAA" },
    },
});

const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#B497D6", contrastText: "#05204A" },
        secondary: { main: "#05204A", contrastText: "#E1E2EF" },
        background: { default: "#E1E2EF", paper: "#FFFFFF" },
        text: { primary: "#02020A", secondary: "#05204A" },
    },
});

export { darkTheme, lightTheme };
