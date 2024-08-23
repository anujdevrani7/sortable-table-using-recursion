import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task } from "./Task";
import { useState } from "react";



export const Column = ({ tasks }) => {
    
    return (
        
        <div className="column">
           
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                
                {
                    tasks?.map((task, index) => {
                        

                        return (
                            <Task key={task?.id} id={task?.id} title={task?.title} child={task?.child} />
                        )

                    })
                }
            </SortableContext>
        </div>
    );
};
