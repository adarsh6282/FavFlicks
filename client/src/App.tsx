import { BrowserRouter } from 'react-router-dom'
import UserRoutes from './routes/UserRoutes'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <BrowserRouter>
      <UserRoutes/>
      <Toaster position='top-right'/>
    </BrowserRouter>
  )
}

export default App
