import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Coin } from "./entities/Coin"
import CoinCard from "components/CoinCard";

const grid = 8;

enum BoardsIds {
  POSSIBLE_COINS = "possibleCoins",
  WATCH_LIST = "watchList",
}
 
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

  const getCoinsByBoardId = (board: BoardsIds) => {
    switch (board) {
      case BoardsIds.POSSIBLE_COINS:
        return unwatchedCoins;
      case BoardsIds.WATCH_LIST:
        return watchedCoins;
      default:
        return []
    }
  }

  const setCoinsByBoardId = (board: BoardsIds, newCoins: Coin[]) => {
    switch (board) {
      case BoardsIds.POSSIBLE_COINS:
        setUnwatchedCoins(newCoins);
        break;
      case BoardsIds.WATCH_LIST:
        setWatchedCoins(newCoins);
        break;
    }
  }

   const onDragEnd = (result:any) => {
    if (!result.destination) {
      return;
    }
    console.log(result)
    const { droppableId: destinatioDroppableId, index: indexToMove } = result.destination;
    const { droppableId: sourceDroppableId } = result.source;

    const destinationCoins = getCoinsByBoardId(destinatioDroppableId);
    const sourceCoins = getCoinsByBoardId(sourceDroppableId);
    
    const movedCoinId = result.draggableId;
    const movedCoin = sourceCoins.find(c => c.id === movedCoinId);

    if(movedCoin){
      const newSourceCoins = sourceCoins.filter(c => c.id !== movedCoinId);
      const newDestinationCoins = insert(destinationCoins, indexToMove, movedCoin );
      console.log(newDestinationCoins)

      setCoinsByBoardId(sourceDroppableId, newSourceCoins);
      setCoinsByBoardId(destinatioDroppableId, newDestinationCoins);
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
          <Droppable droppableId={BoardsIds.POSSIBLE_COINS}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? "lightblue" : "rgba(0,0,0,.12)",
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
          <Droppable droppableId={BoardsIds.WATCH_LIST}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? "lightblue" : "rgba(0,0,0,.12)",
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
