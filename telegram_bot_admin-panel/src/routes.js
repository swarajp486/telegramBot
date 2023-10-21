import Login from './Component/Login'
import Admin from './Component/Admin'
import Home from './Component/Home'

function ErrorAdmin() {
    return (
      <div className="error">
        <div className="card-panel ">Login as Admin!</div>
      </div>
    );
  }
  
  function PrivateOutlet() {
    const token = localStorage.getItem("token");
    return token ? <Admin /> : <ErrorAdmin />;
  }
  
export const routes=[
    {path:'/',element:<Home/>},
    {path:'/login',element:<Login/>},
    {path:'/admin',element:<PrivateOutlet/>},


]