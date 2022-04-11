import '../styles/globals.css'
import { SnackbarProvider } from 'notistack';
import UserContext from "../context/userContext";
import SocketContext from '../context/SocketContext';


function MyApp({ Component, pageProps }) {
  return (
    <SocketContext>
      <UserContext>
        <SnackbarProvider maxSnack={3}>
          <Component {...pageProps} />
        </SnackbarProvider>
      </UserContext>
    </SocketContext>
  )
}

export default MyApp
