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

  // Define a função para remover o timerID do relógio
  botaoPausarRelogio(){
    // Exibe no console qual relógio teve seu timerID removido, ou seja, qual relógio foi pausado
    console.log('Relógio ' + this.timerID + ' pausado!');

    // Remove o timerID deste relógio
    clearInterval(this.timerID);
  }

  // Define a função para inserir um novo timerID no relógio
  botaoRetomarRelogio(){
    // Exibe no console que o relógio voltou a funcionar
    console.log('Reógio retomado!');

    // Retorna um novo identificador ao relógio
    this.timerID = setInterval(() => {
      this.thick()
    },1000);

    // Exibe na tela a qual timerID o relógio está atrelado agora
    console.log("Agora eu sou o relógio " + this.timerID)
  }

  // Ciclo de vida que ocorre quando Clock é inserida no DOM
  // Através do setInterval, o relógio é criado (com um timerID atrelado)
  // Chama a função thick a cada 1000 ms (1s)
  componentDidMount(){
    this.timerID = setInterval(() => {
      this.thick()
    }, 1000);

    // Exibe no console o ID de cada relógio
    console.log("Eu sou o relógio " + this.timerID)
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

        {/* Adiciona um botão para chamar a função para pausar o relógio */}
        <button onClick={(event) => this.botaoPausarRelogio(event)}
        style={{
          color:"White", 
          backgroundColor:"Red", 
          marginRight:"20px", 
          height:"25px", 
          fontWeight:600}}>
            Pausar relógio
        </button>

        {/* Adiciona um botão para chamar a função para retomar o relógio */}
        <button onClick={(event) => this.botaoRetomarRelogio(event)}
        style={{
          color:"White", 
          backgroundColor:"Green", 
          height:"25px",
          fontWeight:600}}>
            Retomar relógio
        </button>
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