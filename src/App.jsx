import { useState } from 'react';
import FetchButton from './components/FetchButton';
import './App.css';

function App() {
  const [currencyRates, setCurrencyRates] = useState({});
  const [omdbData, setOmdbData] = useState(null);
  const [posts, setPosts] = useState([]);

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-4">API Dashboard</h1>

      {/* Currency API */}
      <h2 className="font-semibold mt-4">Currency Rates</h2>
      <FetchButton api="currency" onSuccess={setCurrencyRates}>
        Fetch Currency Rates
      </FetchButton>
      {Object.keys(currencyRates).length > 0 && (
        <table className="border-collapse border border-gray-400 w-full mt-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 p-2">Currency</th>
              <th className="border border-gray-400 p-2">Rate (USD)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(currencyRates).map(([currency, rate]) => (
              <tr key={currency}>
                <td className="border border-gray-400 p-2">{currency}</td>
                <td className="border border-gray-400 p-2">{rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* OMDB API */}
      <h2 className="font-semibold mt-6">OMDB Movie</h2>
      <FetchButton api="omdb" onSuccess={setOmdbData}>
        Fetch OMDB Movie
      </FetchButton>
      {omdbData && (
        <div className="border p-2 mt-2">
          <h3 className="font-bold">{omdbData.Title}</h3>
          <p>Year: {omdbData.Year}</p>
          <p>Genre: {omdbData.Genre}</p>
          <p>Director: {omdbData.Director}</p>
          <p>Plot: {omdbData.Plot}</p>
        </div>
      )}


      <h2 className="font-semibold mt-6">JSONPlaceholder Posts</h2>
      <FetchButton api="jsonplaceholder" onSuccess={setPosts}>
        Fetch Posts
      </FetchButton>

      {posts.length > 0 && (
        <div className="mt-4">
          {posts.map((post) => (
            <div key={post.id} className="border p-2 my-2">
              <h3 className="font-bold">{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default App;