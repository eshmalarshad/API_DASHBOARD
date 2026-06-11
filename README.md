
# API Dashboard React + Node Project

## Overview
This project is a **React frontend + Node.js backend** dashboard that fetches and displays data from multiple public APIs. Data is rendered in **structured cards or tables** for easy viewing.

## Features
- Fetch and display data from **10 APIs**:
  1. Currency Rates (ExchangeRate API)
  2. OMDB Movie Data
  3. JSONPlaceholder Posts
  4. Holiday API
  5. Weather API (Visual Crossing)
  6. Random User API
  7. CocktailDB API
  8. DummyJSON Users
  9. DummyJSON Posts
  10. DummyJSON Quotes
- Each API has a **Fetch button**.
- Data is displayed in **cards or tables** depending on the API type.
- Backend handles API requests, including API keys and rate-limiting.
- Supports **CORS** for frontend communication.

## Technologies
- **Frontend**: React, Tailwind CSS  
- **Backend**: Node.js, Express, node-fetch, dotenv  
- **Security**: Optional API key protection, rate limiting  
- **Version Control**: Git & GitHub

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/eshmalarshad/API_DASHBOARD/


2. Install Dependencies
cd backend
npm install

cd ..
npm install

3. Run
Open terminal
npm run dev

Open another terminal, move to backend directory
node server.js
