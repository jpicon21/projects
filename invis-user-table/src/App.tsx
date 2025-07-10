import UserTable from "./components/UserTable/UserTable";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Dynamic User Data Table
        </h1>
        <UserTable />
      </div>
    </div>
  );
};

export default App;