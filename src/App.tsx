import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Coin } from "./entities/Coin"
import CoinCard from "components/CoinCard";

const grid = 8;

function App() {
  const [coins, setCoins] = React.useState<Coin[]>([]);
  const [unwatchedCoins, setUnwatchedCoins] = React.useState<Coin[]>([]);
  const [watchedCoins] = React.useState<Coin[]>([]);
  React.useEffect(() => {
    const promise = async () => {
      const resp = await fetch(
        "https://api.coinstats.app/public/v1/coins?skip=0&limit=20&currency=USD"
      );
      const data = await resp.json();
      setCoins(data.coins);
      console.log(data);
    };
    promise();
  }, []);
  React.useEffect(() => {
    setUnwatchedCoins(coins);
  }, [coins]);
  /**
   * TODO
   * - implement cross-column drag and drop (remove / insert)
   * - implement intra-column drag and drop (reorder)
   */
  const onDragEnd = () => {};
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Droppable droppableId="possibleCoins">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  /**
                   * TODO: implement background colors with style that changes when dragging
                   * @see https://react-beautiful-dnd.netlify.app/?path=/story/board--simple
                   */
                  padding: grid,
                  width: 250,
                }}
              >
                <p style={{ padding: grid }}>Possible Coins</p>
                {unwatchedCoins.map((item, index) => {
                  return <CoinCard item={item} index={index} />;
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="watchList">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  /**
                   * TODO: implement background colors with style that changes when dragging
                   * @see https://react-beautiful-dnd.netlify.app/?path=/story/board--simple
                   */
                  padding: grid,
                  width: 250,
                }}
              >
                <p style={{ padding: grid }}>Watchlist</p>
                {watchedCoins.map((item, index) => {
                  return <CoinCard item={item} index={index} />;
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      <div style={{ padding: grid }}>
        <p>Charts</p>
      </div>
    </div>
  );
}

export default App;
