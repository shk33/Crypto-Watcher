import React from "react";
import { Coin, CoinChartData } from "./entities/Coin"
import { BoardsIds } from "./entities/CoinBoard"
import { insertIntoArrayByIndex, moveItemInArrayToIndex } from "helpers/Commons";
import BoardList, { SwapCoinsInput } from "components/BoardList";

const grid = 8;

const getCoinChartData = async (coinId:string): Promise<CoinChartData> => {
  const resp = await fetch(
    `https://api.coinstats.app/public/v1/charts?period=1y&coinId=${coinId}`
  );
  const data = await resp.json();
  console.log(data);
  
  return {
    coinId,
    id: coinId,
    options: {
      title: coinId,
      hAxis: {
        title: "Day", 
        titleTextStyle: { color: "#444" }
      },
      vAxis: { minValue: 0 },
      chartArea: {
        width: "50%",
        height: "75%"
      },
    },
    series: [
      ["Year", "Price"],
      ...data.chart.map( (d:any) => {
        return [
          new Date(d[0]  * 1000).toLocaleDateString('en-US'),
          d[1]
        ]
      })
    ]
  };
};
 
function App() {
  const [coins, setCoins] = React.useState<Coin[]>([]);
  const [unwatchedCoins, setUnwatchedCoins] = React.useState<Coin[]>([]);
  const [watchedCoins, setWatchedCoins] = React.useState<Coin[]>([]);
  const [chartsData, /* setChartsData */] = React.useState<CoinChartData[]>([]);

  React.useEffect(() => {
    const promise = async () => {
      const resp = await fetch(
        "https://api.coinstats.app/public/v1/coins?skip=0&limit=20&currency=USD"
      );
      const data = await resp.json();
      setCoins(data.coins);
    };
    promise();
  }, []);

  React.useEffect(() => {
    setUnwatchedCoins(coins);
  }, [coins]);

  React.useEffect(() => {
    const watchedCoinIds = watchedCoins.map(c => c.id);
    const chartsCoinIds = chartsData.map(c => c.coinId);

    const newIds = watchedCoinIds.filter(x => !chartsCoinIds.includes(x));
    const newId = newIds[0];
    getCoinChartData(newId)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedCoins]);

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

  const handleMoveCoinToList = (result: any) => {
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
      const newDestinationCoins = insertIntoArrayByIndex(destinationCoins, indexToMove, movedCoin );
      console.log(newDestinationCoins)

      setCoinsByBoardId(sourceDroppableId, newSourceCoins);
      setCoinsByBoardId(destinatioDroppableId, newDestinationCoins);
    }
  };

  const handleSwapCoins = (result: SwapCoinsInput) => {
    const allCoins = getCoinsByBoardId(result.boardId);
    const movedCoin = allCoins.find(c => c.id === result.coinId);

    if(movedCoin){
      const newCoins = moveItemInArrayToIndex(allCoins, result.oldIndex, result.newIndex);
      setCoinsByBoardId(result.boardId, newCoins);
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
      <BoardList 
        boards={[{
          boardId: BoardsIds.POSSIBLE_COINS,
          coins: unwatchedCoins,
        },{
          boardId: BoardsIds.WATCH_LIST,
          coins: watchedCoins,
        }]}
        onMoveCoinToList={handleMoveCoinToList}
        onSwapCoinInList={handleSwapCoins}
      />
      <div style={{ padding: grid }}>
        <p>Charts</p>
      </div>
    </div>
  );
}

export default App;
