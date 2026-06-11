import { useState } from 'react';

function FetchButton({ api, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/fetch?api=${api}`);
      const data = await response.json();
      onSuccess(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <button
      className="bg-pink-300 border-2 border-pink-500 text-black hover:bg-pink-400 p-2 mt-2"
      onClick={fetchData}
      disabled={loading}
    >
      {loading ? 'Loading...' : `Fetch ${api}`}
    </button>
  );
}

export default FetchButton;