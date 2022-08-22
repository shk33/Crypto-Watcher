import { Coin } from "../entities/Coin"
import { BoardsIds } from "../entities/CoinBoard";
import CoinBoard from "components/CoinBoard";
import { DragDropContext } from "react-beautiful-dnd";

interface BoardListProps {
    boards: SingleBoardList[];
    onMoveCoinToList: (result:any) => void
}

interface SingleBoardList {
    boardId: BoardsIds;
    coins: Coin[];
}
  
const BoardList = ({ boards, onMoveCoinToList }: BoardListProps) => {
    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        const { droppableId: destinatioDroppableId } = result.destination;
        const { droppableId: sourceDroppableId } = result.source;

        if(destinatioDroppableId !== sourceDroppableId){
            onMoveCoinToList(result);
        }
    }
    
    return (
        <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", flexDirection: "row" }}>
            {boards.map(board => {
                return <CoinBoard droppableId={board.boardId} coins={board.coins}/>
            })}
        </div>
      </DragDropContext>
    );
};

export default BoardList;
