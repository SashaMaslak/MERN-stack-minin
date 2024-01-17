import "materialize-css"
import { useRoutes } from "./routes"

function App() {
  const routes = useRoutes(false)
  return <div className="container">{routes}</div>
}

export default App

// 1:26:00
