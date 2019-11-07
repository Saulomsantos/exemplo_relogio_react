// Exemplo de relógio para ilustrar o ciclo de vida de um componente

import React from 'react';
import './App.css';

// Define uma função DataFormatada que retorna o subtítulo com o valor da data formatada
function DataFormatada(props){
  return <h2>Horário Atual: {props.date.toLocaleTimeString()}</h2>
}

// Define a class Clock que será chamada na renderização dentro da App
class Clock extends React.Component{
  constructor(props){
    super(props);
    // Define o estado da data pegando a data atual
    this.state = {date: new Date()};
  }

  // Ciclo de vida que ocorre quando Clock é inserida no DOM
  // Através do setInterval, o relógio é criado (com um timerID atrelado)
  // Chama a função thick a cada 1000 ms (1s)
  componentDidMount(){
    this.timerID = setInterval(() => {
      this.thick()
    }, 1000);

    // Exibe no console o ID de cada relógio
    console.log(this.timerID)
  }

  // Ciclo de vida que ocorre quando o componente é removido do DOM
  // Quando isso ocorre, a função clearInterval limpa o relógio criado pelo setInterval
  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  // Define no state date a data atual a cada vez que é chamada
  thick(){
    this.setState({
      date: new Date()
    });
  }

  // Renderiza na tela o título e a função DataFormatada, passando date com o valor atual do state
  render(){
    return(
      <div>
        <h1>Relógio</h1>
        <DataFormatada date={this.state.date} />
      </div>
    )
  }
}

// Função principal invocada no index.js
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Faz a chamada de dois relógios, para mostrar a independência destes */}
        <Clock />
        <Clock />
      </header>
    </div>
  );
}

// Declara que a função App pode ser usada fora do escopo dela mesma
export default App;
