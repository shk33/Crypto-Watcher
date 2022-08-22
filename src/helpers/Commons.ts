export const insertIntoArrayByIndex = (arr:Array<any>, index: number, newItem:any) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index)
  ];


export const moveItemInArrayToIndex = (array:Array<any>, fromIndex:number, toIndex:number) => {
    if (fromIndex === toIndex) return array;

    const item = array[fromIndex];
    const newArray = [...array];
  
    return [
        // part of the array before the specified index
        ...newArray.slice(0, toIndex).filter(c => c.id !== item.id),
        // inserted item
        item,
        // part of the array after the specified index
        ...newArray.slice(toIndex).filter(c => c.id !== item.id)
    ];
  };
