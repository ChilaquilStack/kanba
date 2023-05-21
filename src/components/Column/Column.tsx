import { useStore, State } from "../../store"
import { Task } from "../Task"
import "./Column.css"
import { shallow } from "zustand/shallow"
import { useState } from "react";

interface Props {
    state: State
}

export const Column: React.FC<Props> = ({ state })=> {
    
    const [ text, setText ] = useState('');
    const [ open, setOpen ] = useState(false);
    const [ drop, setDrop ] = useState(false);

    const tasks = useStore(
        store => store.tasks.filter(task => task.state === state),
        shallow
    )

    const { 
        addTask, 
        draggedTask, 
        setDraggedTask,
        moveTask,
    } = useStore(store => store)

    return(
        <div 
            className={"column " + { drop: drop ? "drop" : "" }}
            onDragOver={e => {
                setDrop(true);
                e.preventDefault()
            }}
            onDragLeave={e => {
                setDrop(false)
                e.preventDefault()
            }}
            onDrop={() => {
                setDrop(false)
                moveTask({title: draggedTask, state});
                setDraggedTask('')
            }}
        >
            <div className="titleWrapper">
                <p>{state}</p>
                <button onClick={() => setOpen(true)}>Add</button>
            </div>
            {tasks.map(({title}) => <Task title={title} key={title} />)}
            {open && (
                <div className="Modal">
                    <div className="modalContent">
                        <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
                        <button onClick={() => { 
                            addTask({ title: text, state})
                            setText('')
                            setOpen(false)
                        }}>
                            submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}