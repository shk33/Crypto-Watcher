import { Coin } from "../entities/Coin"
import { BoardsIds } from "../entities/CoinBoard";
import CoinBoard from "components/CoinBoard";
import { DragDropContext } from "react-beautiful-dnd";

export interface SwapCoinsInput {
    coinId: string;
    boardId: BoardsIds;
    newIndex: number;
    oldIndex: number;
}

interface BoardListProps {
    boards: SingleBoardList[];
    onMoveCoinToList: (result:any) => void
    onSwapCoinInList: (result:SwapCoinsInput) => void
}

interface SingleBoardList {
    boardId: BoardsIds;
    coins: Coin[];
    name: string;
}
  
const BoardList = ({ boards, onMoveCoinToList, onSwapCoinInList }: BoardListProps) => {
    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        const { droppableId: destinatioDroppableId, index: destinationIndex } = result.destination;
        const { droppableId: sourceDroppableId, index: sourceIndex } = result.source;

        // Move coin to other list
        if(destinatioDroppableId !== sourceDroppableId){
            onMoveCoinToList(result);
        } else { // Reorder Coin in the same list aka swapping
            const coinId = result.draggableId;
            onSwapCoinInList({
                coinId, 
                boardId: destinatioDroppableId,
                newIndex: destinationIndex,
                oldIndex: sourceIndex
            })
        }
    }
    
    return (
        <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", flexDirection: "row" }}>
            {boards.map(board => {
                return <CoinBoard name={board.name} key={board.boardId} droppableId={board.boardId} coins={board.coins}/>
            })}
        </div>
      </DragDropContext>
    );
};

export default BoardList;
