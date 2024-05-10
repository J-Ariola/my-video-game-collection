import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Header from './components/Header';

type Props = {
  title:string;
  onClick():void;
}

const ClickCountButton = ({ title, onClick }: Props): React.JSX.Element => {
  return (
    <button onClick={onClick}>
    {title}
    </button>
  )
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header/>
      <ClickCountButton title={"Click button: " + count} onClick={() => setCount(count + 1)}/>
    </div>
  )
}

export default App
