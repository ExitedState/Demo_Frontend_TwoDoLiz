import { Button } from 'antd';
import './App.css';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="App">
      <Button type="primary">Button</Button>
      <TaskList />
    </div>
  );
}

export default App;
