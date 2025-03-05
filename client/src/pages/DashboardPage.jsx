import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

 

  // style the dashboard page and then create a button to take them to messages
  return (
    <div className="flex flex-col h-screen justify-center">
      <header className="bg-white shadow p-4">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      </header>
      <main className="flex-1 p-4">
        <div className=" rounded-lg p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">
            Welcome to your dashboard
          </h2>
          <p className="text-gray-600">
            Here you can manage your account and messages.
          </p>
        </div>
        <Button onClick={()=>{navigate("/messages")}}> Messages </Button>
      </main>
    </div>
  );
};

export default DashboardPage;
