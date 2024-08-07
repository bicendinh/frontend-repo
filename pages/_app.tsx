import StoreProvider from "@/app/StoreProvider";
import theme from "@/theme/theme";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
