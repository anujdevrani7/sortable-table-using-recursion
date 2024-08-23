import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import App from "./App";
import { useState } from "react";


export const Task = ({ id, title, child }) => {
    const [validate, setValidate] = useState()
    const [show, setshow] = useState(false)
    const { attributes, listeners, setNodeRef, transform, transition } =useSortable({ id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };
    const handelClick = (e,id) => {
        if(validate===id){
            setshow(false)
            return
        }
        // console.log("value of the id is  : ",id)
        setshow(true)
        setValidate(id)

    }
    
    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="task"
        >
            {/* <button className="btn btn-primary " onClick={()=>{handelClick(id)}}>
                drop down
            </button> */}
            {title}
            <button className='btn btn-primary' onMouseDown={(e)=>{handelClick(e,id)}}> click me </button>


            {
                 child && (
                    validate===id &&(
                        show?(<App CData={child} />):("")

                        
                    )
                ) 
            }
        </div>
    );
};
