import { Route, Routes } from "react-router-dom"
import TasksPage from "./pages/TasksPage.jsx"
import TasksFrom from "./pages/TasksFrom.jsx"
import NotFound from "./pages/NotFound.jsx"
import Navbar from "./components/Navbar.jsx"
import { TaskContextProvider } from "./context/TaskProvider.jsx"

function App() {
  return (
    <div className="bg-zinc-900 h-screen">
      <Navbar />
      <div className="container mx-auto py-4">
        <TaskContextProvider>
          <Routes>
            <Route path='/' element={<TasksPage />} />
            <Route path='/new' element={<TasksFrom />} />
            <Route path='/edit/:id' element={<TasksFrom />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </TaskContextProvider>
      </div>
    </div>
  )
}

export default App
