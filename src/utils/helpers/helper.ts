import { MutableRefObject, RefObject } from "react";

export const focusPosition=(parentIndex: number,childIndex: number,inputRef: MutableRefObject<RefObject<HTMLInputElement>[][]>,dataLength:number)=>{
    if(parentIndex<dataLength){
        if (childIndex === 0) {
            inputRef.current[parentIndex][childIndex + 1].current?.focus();
        } else {
            inputRef.current[parentIndex + 1][0].current?.focus();
        }
    }
}