# MERN application
It uses a MongoDB [`time_use` DB](https://ourworldindata.org/time-use).
The data is displayed in 3 formats:
- A map of the world showing a heat map of which countries use the most time based on color. The category automatically changes every 4 seconds
- A bar chart created in D3 that gives more precise control to the user to see countries and time use
- A table that displays the average time spent per category by Region


## Notes
- The data is not as complete as it should be. For example, there is only one country for all of Africa (SA), and Australia is seen as a region, instead of a country
- If this wasn't using the school's server to host the DB, i would deploy it with Vercel

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.