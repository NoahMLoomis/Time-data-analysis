# MERN application
It uses a MongoDB [`time_use` DB](https://ourworldindata.org/time-use).
The data is displayed in 3 formats:
- A map of the world showing a heat map of which countries use the most time based on color. The category automatically changes every 4 seconds
- A bar chart created in D3 that gives more precise control to the user to see countries and time use
- A table that displays the average time spent per category by Region

## Requirements
- [node](https://nodejs.org/en/download/)

## Notes
- There is a bug with the map displaying too small, to fix it, refresh the page when your browser is at full width
- The data is not as complete as it should be. For example, there is only one country for all of Africa (SA), and Australia is seen as a region, instead of a country
- Some of the data is not being displayed in the map, due to some of the country names being different. Ex: USA => U.S.A or United States of America
- [FINALLY MANAGED TO DEPLOY THIS WITH VERCEL!!!](https://data-analysis-7snn6cevt-noahmloomis.vercel.app/)

## Getting Started

First, clone the repo
```bash
git clone https://github.com/NoahMLoomis/data-analysis
```
Navigate to the project folder `/data-analysis`
```bash
cd ./data-analysis
```

Install packages, then start the development server:


```bash
npm install

# Followed by

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
