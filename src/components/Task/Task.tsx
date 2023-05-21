import "./Task.css"
import { useStore, State } from "../../store"
import trash from "../../assets/trash.png"

interface Props {
    title: string
}

export const Task: React.FC<Props> = ({ title }) => {
    
    const task = useStore(store => store.tasks.find(task => task.title === title))
    const { deleteTask, setDraggedTask } = useStore(store => store);

    return (
        <div 
            draggable
            className="Task"
            onDragStart={() => setDraggedTask(task?.title || "")}
        >
            <div>{task?.title}</div>
            <div className="BottomWrapper">
                <img src={trash} alt="delete task" onClick={() => deleteTask(title)}/>
                <div className={task?.state || State.PLANNED}>{task?.state}</div>
            </div>
        </div>
    )
}