# Crypto Chart Watcher

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Imagine you're on a team with a more junior developer who has a cool idea for a product that allows you to track cryptocurrencies and see their price movements. He's got a proof of concept but needs help cleaning it up.

## Running the App

Runs the app in the development mode using `yarn start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## The Task

We need your help getting this app ready for production.

Your tasks:

### Drag and Drop

- Implement the proper drag n drop functionality, such that dragging a card into the "Watch" list will remove it from "Possible Coins" and vice versa. It should work like the functionality here: https://react-beautiful-dnd.netlify.app/?path=/story/board--simple

### Charts

- Use the CoinStats API to fetch the historical price data for each coin on the watch list
- Populate the "Charts" section of the screen with a list of charts, showing the 1 year price history for each coin on the watch list - use a chart library of your choice
- Dragging a coin from the "Watch List" and back to "Possible Coins" should remove its chart from the "Charts" section

### Code Cleanup

This code is a mess. Please help us organize it better so other developers can understand it more easily.

### Bonus

If you want, you can figure out how to store the state of "watch list" vs "possible coins" so that users can return to their watch list even after they close the tab.
