import Login from './components/Authentication/Login'
import Home from './components/User/Home'

function App() {
  let isAuthenticated = true
  return (
    <div className="App">
    {isAuthenticated ? <Home />: <Login />}
    </div>
  );
}

export default App;
