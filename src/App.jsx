import { useState } from 'react';
import FetchButton from './components/FetchButton';
import './App.css';

function App() {
  const [currencyRates, setCurrencyRates] = useState({});
  const [omdbData, setOmdbData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [weather, setWeather] = useState(null);
  const [randomUser, setRandomUser] = useState(null);
  const [cocktailData, setCocktailData] = useState(null);
  const [dummyUsers, setDummyUsers] = useState([]);
  const [dummyPosts, setDummyPosts] = useState([]);
  const [quotesData, setQuotesData] = useState([]);

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


      <h2 className="font-semibold mt-6">Posts</h2>
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

      <h2 className="font-semibold mt-6">Holidays</h2>
      <FetchButton api="holiday" onSuccess={setHolidays}>
        Fetch Holidays
      </FetchButton>

      {holidays.length > 0 && (
        <div className="mt-2">
          {holidays.map((holiday) => (
            <div key={holiday.name + holiday.date} className="border p-2 my-1">
              <p><strong>{holiday.name}</strong> - {holiday.date}</p>
            </div>
          ))}
        </div>
      )}


      {/* Weather */}
      <h2 className="font-semibold mt-6">Weather</h2>
      <FetchButton api="weather" onSuccess={setWeather} />
      {weather && (
        <div className="border p-2 mt-2">
          <p><strong>Location:</strong> {weather.location}</p>
          <p><strong>Temperature:</strong> {weather.current.temp}°C</p>
          <p><strong>Conditions:</strong> {weather.current.conditions}</p>
          <h4 className="mt-2 font-semibold">Forecast:</h4>
          {weather.forecast.slice(0, 10).map((day) => (
            <p key={day.datetime}>{day.datetime}: {day.tempmin}°C - {day.tempmax}°C, {day.conditions}</p>
          ))}
        </div>
      )}

      <h2 className="font-semibold mt-6">Random User</h2>
      <FetchButton api="randomuser" onSuccess={setRandomUser} />

      {randomUser && (
        <div className="border p-2 mt-2">
          <p><strong>Name:</strong> {randomUser.name.title} {randomUser.name.first} {randomUser.name.last}</p>
          <p><strong>Email:</strong> {randomUser.email}</p>
          <p><strong>Gender:</strong> {randomUser.gender}</p>
          <p><strong>Location:</strong> {randomUser.location.city}, {randomUser.location.country}</p>
          <img src={randomUser.picture.large} alt="Random User" className="mt-2 rounded-full" />
        </div>
      )}



      <h2 className="font-semibold mt-6">CocktailDB API</h2>
      <FetchButton api="cocktail" onSuccess={setCocktailData} >
        Fetch Cocktails
      </FetchButton>

      {cocktailData?.drinks?.map((drink) => (
        <div key={drink.idDrink} className="border p-2 my-2">
          <h3>{drink.strDrink}</h3>
          <img
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            width="150"
          />
          <p>{drink.strCategory}</p>
        </div>
      ))}

      <h2 className="font-semibold mt-6">Dummy Users</h2>
      <FetchButton api="dummyusers" onSuccess={setDummyUsers} >
        Fetch Dummy Users
      </FetchButton>
      {dummyUsers?.users?.length > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dummyUsers.users.map(user => (
            <div key={user.id} className="border p-4 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">{user.firstName} {user.lastName}</h3>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Gender:</strong> {user.gender}</p>

              <p className="mt-2 font-semibold">Address:</p>
              <p>{user.address.address}</p>
              <p>{user.address.city}, {user.address.state}</p>
              <p>{user.address.postalCode}</p>

              <p className="mt-2 font-semibold">Company:</p>
              <p>{user.company.name}</p>
              <p>{user.company.department}</p>

              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-24 h-24 object-cover rounded-full mt-2"
              />
            </div>
          ))}
        </div>
      )}


      <h2 className="font-semibold mt-6">Dummy SocialPosts</h2>
      <FetchButton api="dummyPosts" onSuccess={setDummyPosts}>
        Fetch Dummy Social Posts
      </FetchButton>

      {dummyPosts?.posts?.length > 0 && (
        <div className="mt-4">
          {dummyPosts.posts.map(post => (
            <div key={post.id} className="border p-2 my-2 rounded-lg shadow-sm">
              <h3 className="font-bold">{post.title}</h3>
              <p>{post.body}</p>
              <p className="text-sm text-gray-500">User ID: {post.userId}</p>
              <p className="text-sm text-gray-500">Reactions: {post.reactions.likes} Likes / {post.reactions.dislikes} Dislikes</p>
              <p className="text-sm text-gray-500">Views: {post.views}</p>
              <p className="text-sm text-gray-500">Tags: {post.tags.join(', ')}</p>
            </div>
          ))}
        </div>
      )}

      <h2 className="font-semibold mt-6">Quotes</h2>
      <FetchButton api="quotes" onSuccess={setQuotesData}>
        Fetch Quotes
      </FetchButton>


      {quotesData?.quotes?.length > 0 && (
        <div className="mt-4">
          {quotesData.quotes.map(quote => (
            <div key={quote.id} className="border p-2 my-2 rounded-lg shadow-sm">
              <p className="italic">"{quote.quote}"</p>
              <p className="text-right font-semibold mt-1">— {quote.author}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default App;
