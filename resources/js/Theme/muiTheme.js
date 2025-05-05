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
        // primary: { main: "#B497D6", contrastText: "#05204A" },
        // secondary: { main: "#05204A", contrastText: "#E1E2EF" },
        // text: { primary: "#02020A", secondary: "#05204A" },
    },
    typography: {
        fontFamily: "Inter, sans-serif",
        h1: { fontSize: "2.5rem", fontWeight: 700 },
        h2: { fontSize: "2rem", fontWeight: 600 },
        h3: { fontSize: "1.75rem", fontWeight: 500 },
        h4: { fontSize: "1.5rem", fontWeight: 500 },
        body1: { fontSize: "1rem", fontWeight: 400, color: "#02020A" },
        body2: { fontSize: "0.875rem", fontWeight: 400, color: "#05204A" },
        button: { fontSize: "1rem", textTransform: "none", fontWeight: 600 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "8px",
                    padding: "10px 16px",
                    textTransform: "none",
                    fontWeight: 600,
                    backgroundColor: "#EEF2FF", // Indigo-50
                    transition: "all 0.2s ease-in-out",
                },
                containedPrimary: {
                    backgroundColor: "#6366F1", // Indigo-500
                    color: "#FFFFFF",
                    "&:hover": { backgroundColor: "#4F46E5" }, // Indigo-600
                },
                containedSecondary: {
                    backgroundColor: "#eef2ff", // Indigo-200
                    color: "#3730A3", // Indigo-800
                    "&:hover": { backgroundColor: "#C7D2FE" }, // Indigo-300
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& label": { color: "#bae6fd" },
                    "& input": { color: "#082f49" },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#bae6fd" },
                        "&:hover fieldset": { borderColor: "#bae6fd" },
                        "&.Mui-focused fieldset": { borderColor: "#bae6fd" },
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    padding: "16px",
                    borderRadius: "12px",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                },
            },
        },
    },
});



export { darkTheme, lightTheme };
