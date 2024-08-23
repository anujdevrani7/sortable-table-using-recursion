import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Column } from './Column';

const data = [
  {
    "id": 1,
    "title": "Home",
    "child": null
  },
  {
    "id": 2,
    "title": "About",
    "child": null
  },
  {
    "id": 3,
    "title": "Services",
    "child": [
      {
        "id": 4,
        "title": "Web Development",
        "child": [
          {
            "id": 5,
            "title": "Frontend",
            "child": [
              {
                "id": 6,
                "title": "React",
                "child": null
              },
              {
                "id": 7,
                "title": "Angular",
                "child": null
              }
            ]
          },
          {
            "id": 8,
            "title": "Backend",
            "child": [
              {
                "id": 9,
                "title": "Node.js",
                "child": null
              },
              {
                "id": 10,
                "title": "Python",
                "child": null
              }
            ]
          }
        ]
      },
      {
        "id": 11,
        "title": "Mobile Development",
        "child": [
          {
            "id": 12,
            "title": "iOS",
            "child": null
          },
          {
            "id": 13,
            "title": "Android",
            "child": null
          }
        ]
      }
    ]
  },
  {
    "id": 14,
    "title": "Contact",
    "child": null
  }
]


function App({CData=data}) {
  const [tasks, setTasks] = useState(CData);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };
  return (
    <>
    
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      > 
        
        <Column id="toDo" tasks={tasks} />
      </DndContext>
    </>
  );

}

export default App;
