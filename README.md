# ![CF](http://i.imgur.com/7v5ASc8.png) Pagination 



## Submission Instructions
* Fork this repo
* Submit on Canvas

## Feature Tasks
Build an app that allows users to interact with a large dataset making it more
manageable using pagniation. The dataset should contain at least a few hundred,
or a few thousand entries. Each entry should contain at least two properties
(not counting any sort of id).

Sign up for an account on http://kaggle.com to find a large interesting data
set. You should write a one-time-use script to interact with the initial
dataset and populate your database. Beware messy data! You may need to manually
manipulate your data to change `null` values to zero or something else
sensible. It's up to you!

## Full Stack App
Configure your server so it serves a frontend and a backend. The frontend
should serve your React app using Webpack or Parcel bundlers. The backend
should have a paginated endpoint that retrieves data from MongoDB.

Your app must utilize the following technologies:

* MongoDB
* Express
* Webpack or Parcel
* React

Your application should have the following directory structure:

* `index.js` - your server
* `routes/` - one route file handling api requests
* `models/` - your MongoDB models
* `public/`
  * `public/index.html` - your HTML template
  * `public/src/app.js` - your initial React app
  * `public/src/components/` - any React components
* `scripts/seed.js` - a file dedicated to parsing your data set
* `your_data.[csv|json|js|txt]` - your data set (if it's small)

**Note:** if your data file is extremely large (over 20MB) do not commit it to
the repo. Instead, save a link to the data source in your README. Repos are
for source code, not data distribution.

## Pagination
Your pagination endpoint should support at least these query parameters:

* `?count=` Defines how many items to return. Default to something like `10`,
  `25` or `100`. 
* `?index=` Defines where in the dataset to start returning data from. Default
  strictly to `0` so unparameterized queries start at the beginning of the
  dataset.

Configure your endpoint so it returns a set of results as well as a property
conveying the total amount of results available.

```js
{
  results: [],
  total: 17,778,
}
```

Configure your UI in react so it displays results page-by-page as many as
they're returned and has `next` and `previous` buttons to navigation forward
and backward.

* Display the range of search results in your UI. Show a string like
  `Displaying 10-20 of 17,778 results`.
* Disable the `next` and `previous` buttons if you're at the beggining or end
  of the dataset.

Your UI must include something that indicates when search results are loading
between when a request to the server is made and when the response comes back,
including the first time the page loads.

## Challenges
You may wonder how to load data the first time someone comes to the page.  Read
about the `.componentDidMount` lifecycle method and initiate your first network
request from there.

You may find the state of your application doesn't update immediately when
you call `this.setState` to where you're at in search results when you press
`previous` or `next`. Read the docs for `.setState` and utilize the second
parameter callback function to guarantee code doesn't execute until state is
properly updated.

* [componentDidMount docs](https://reactjs.org/docs/react-component.html#componentdidmount)
* [setState docs](https://reactjs.org/docs/react-component.html#setstate)

Good luck, have fun. Happy data hunting.

## Stretch Goals
Optionally you many choose to make your endpoint even more queryable. 
For example, here's how a `/api/movies` endpoint would accept search
queries for titles, and to restrict searches between years:

* `?q=` queries movies by their title.
* `?min=` queries movies so they appear after this year.
* `?max=` queries movies so they appear before this year.

Allow users to sort data by various properties.
