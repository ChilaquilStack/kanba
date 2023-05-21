import { State } from './store'
import { Column } from './components/Column'
import './App.css'

export default function App() {

  return (
    <div className="App">
      <Column state={State.PLANNED} />
      <Column state={State.ONGOING} />
      <Column state={State.DONE} />
    </div>
  )
    
}