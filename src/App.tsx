import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Coin } from "./entities/Coin"
import CoinCard from "components/CoinCard";

const grid = 8;

function App() {
  const [coins, setCoins] = React.useState<Coin[]>([]);
  const [unwatchedCoins, setUnwatchedCoins] = React.useState<Coin[]>([]);
  const [watchedCoins, setWatchedCoins] = React.useState<Coin[]>([]);

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

   const insert = (arr:Array<any>, index: number, newItem:any) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index)
  ];

   const onDragEnd = (result:any) => {
    if (!result.destination) {
      return;
    }
    console.log(result)
    const { droppableId, index: indexToDrop } = result.destination;

    if(droppableId === "watchList"){ 
      const draggableId = result.draggableId;
      const movedCoin = coins.find(c => c.id === draggableId);

      if(movedCoin){
        const newUnwatchedCoins = unwatchedCoins.filter(c => c.id !== draggableId);
        const newWatchedCoins = insert(watchedCoins, indexToDrop, movedCoin );

        setUnwatchedCoins(newUnwatchedCoins);
        setWatchedCoins(newWatchedCoins);
      }

    }

    if(droppableId === "possibleCoins"){ 
      const draggableId = result.draggableId;
      const movedCoin = coins.find(c => c.id === draggableId);

      if(movedCoin){
        const newWatchedCoins = watchedCoins.filter(c => c.id !== draggableId);
        const newUnwatchedCoins = insert(unwatchedCoins, indexToDrop, movedCoin );

        setUnwatchedCoins(newUnwatchedCoins);
        setWatchedCoins(newWatchedCoins);
      }

    }
  };

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
                  return <CoinCard key={item.id} item={item} index={index} />;
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
                  return <CoinCard key={item.id} item={item} index={index} />;
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
