import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Coin {
  id: string;
  availableSupply: number;
  icon: string;
  marketCap: number;
  price: number;
  name: string;
  symbol: string;
}

const grid = 8;

interface CoinCardProps {
  item: Coin;
  index: number;
}

/**
 * TODO: implement conditional style depending on dragging status
 * @see https://react-beautiful-dnd.netlify.app/?path=/story/board--simple
 */
const CoinCard = ({ item, index }: CoinCardProps) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              userSelect: "none",
              padding: grid * 0.25,
              margin: `0 0 ${grid}px 0`,
              ...provided.draggableProps.style,
            }}
          >
            <Card variant="outlined">
              <CardContent>
                <div>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <img src={item.icon} style={{ height: 24, width: 24 }} />
                    <p style={{ paddingLeft: 16 }}>{item.name}</p>
                  </div>
                  <p>{item.symbol}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      }}
    </Draggable>
  );
};
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
