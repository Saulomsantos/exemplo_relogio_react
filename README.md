# Exemplo relogio react
Projeto exemplo de relógio usando React para ilustrar o ciclo de vida de um componente

## Roteiro de aula

Passo a passo de construção e explicação da aula sobre ciclo de vida

### 1. Criar e executar o projeto exemplo-clock

- Executar o comando ``npx create-react-app exemplo-clock``

- Navegar até a pasta executando ``cd exemplo-clock``

- Executar o projeto através do comando ``npm start``

### 2. Limpar o código que não será utilizado

- Abrir a pasta do projeto com o Visual Studio Code

- Abrir o arquivo ``src/App.js``

- Remover todo o conteúdo dentro da tag ``<header>``

- Remover o ``import`` do logo

### 3. Definir a função DataFormatada

- Abaixo dos imports, definir a função ``DataFromatada()``
    
    ```js
    function DataFormatada(props){
        return <h2>Horário Atual: {props.date.toLocaleTimeString()}</h2>
    };
    ```
    
### 4. Definir a class Clock

- Definir a class Clock com o construtor

    ```js
    class Clock extends React.Component{
        constructor(props){
            super(props);
            // Define o estado date pegando a data atual
            this.state = {date: new Date()};
    }
    ```
  
- Definir dentro da class Clock os ciclos de vida ``componentDidMount()`` e ``componentWillUnmount()`` porém sem conteúdo
  
    ```js
    class Clock extends React.Component{
        constructor(props){
            super(props);
            // Define o estado da data pegando a data atual
            this.state = {date: new Date()};
        }

        // Ciclo de vida que ocorre quando Clock é inserida no DOM
        componentDidMount(){
        }

        // Ciclo de vida que ocorre quando o componente é removido do DOM
        // Quando isso ocorre, a função clearInterval limpa o relógio criado pelo setInterval
        componentWillUnmount(){  
        }
    ```
  
- Definir a função ``thick()`` responsável por atualizar o estado date, logo abaixo dos ciclos de vida e dentro da class Clock

    ```js
    // Define no state date a data atual a cada vez que é chamada
      thick(){
        this.setState({
          date: new Date()
        });
      }
    ```
  
 - Definir o ``render()`` da class Clock logo em seguida
 
    ```js
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
    ```
  
### 5. Chamar dois relógios dentro da tag ```<header>``` da função ```App()``` que será invocada no ``index.js``

    ```js
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
    ```

- Neste momento, mostrar que os relógios estão parados

O componente foi renderizado, porém a função ``thick()`` não foi invocada, por isso não atualiza o ``state`` e, consequentemente, a hora

### 6. Dentro da função ``componentDidMount()``, criar efetivamente a chamada de incremento dos relógios através da função ``setInterval()`` e mostrar seus IDs através do ``console.log`` para verificar que são diferentes

    ```js
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
    ```

- Explicar o funcionamento deste ciclo de vida

Quando a class Clock é inserida no DOM, tudo que está dentro da função é executado

A função componentDidMount() só é executada uma vez, logo o console.log() só é executada também uma vez. Porém, a função setInterval() ocorre a cada 1s infinitamente e, consequentemente, a função thick() é invocada também a cada 1s, ilustrando o funcionamento de um relógio


### 7. Dentro da função ``componentWillUnmount()``, utilizar a função ``clearInterval()`` para limpar o relógio

    ```js
    componentWillUnmount(){
        clearInterval(this.timerID);
      }
    ```

- Explicar o funcionamento deste ciclo de vida

Quando a class Clock é removida do DOM, tudo que está dentro da função é executado


