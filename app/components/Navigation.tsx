const Navigation = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Light Pollution Visualizer</h1>
        <span className="ml-4 text-sm bg-blue-600 px-2 py-1 rounded">NASA Space Apps Challenge</span>
      </div>
      
      <div className="flex space-x-4">
        <button className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700">Home</button>
        <button className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700">About</button>
        <button className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700">Data Sources</button>
        <button className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700">Contact</button>
      </div>
    </nav>
  );
};

export default Navigation;