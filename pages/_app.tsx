import StoreProvider from "@/app/StoreProvider";
import theme from "@/theme/theme";
import { ThemeProvider } from "@mui/material";
import { ConfirmProvider } from "material-ui-confirm";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <ConfirmProvider
          defaultOptions={{
            confirmationButtonProps: { autoFocus: true },
          }}
        >
          <Component {...pageProps} />
        </ConfirmProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
