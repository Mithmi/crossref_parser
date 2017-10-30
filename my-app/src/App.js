import React, { Component } from 'react';
import './App.css';
import Collapsible from 'react-collapsible';



class App extends Component {
    constructor(props){
    super(props);
    this.onClick = this.handleClick.bind(this);
    this.state = {
      data: [],
      items: [],
      title: "",
      authors: [],
      activeItems: [0, 1],
    };
    this.changeActiveItems = this.changeActiveItems.bind(this);
   }

    handleClick(event, query) {
      const {id} = event.target;
      this.search_by_author(query)
    }

    changeActiveItems(activeItems) {
      this.setState({
        activeItems,
      });
    }

    componentWillMount(){
      this.search();


    }

    updateSearch(){
      this.search(this.refs.query.value);
    }

    search(query = "health"){
      var url =`https://api.crossref.org/works?query.title=${query}&rows=5&mailto=workaintfun@yahoo.com`;
      return fetch(url).then((response) => response.json()).then((response) => {
        this.setState({
          data: response,
          items: response.message.items
        });
      });

    }

    search_by_author(query = ""){
      var url =`https://api.crossref.org/works?query.author=${query}&rows=1&mailto=@yahoo.com`;
      fetch(url).then((response) => response.json()).then((response) => {
        this.setState({
          authors: response.message.items
        });
        const author = this.state.authors;
        const titleList = author.map((titl, index) => {
          return (<li>{titl.title}</li>)
        });
        this.setState({
          titleList: titleList
        });
      });

    }


    render(){
      console.log("Data", this.state.data.message);
      console.log("Items", this.state.items);

      const test = this.state.items;
      const testList = test.map((item, index) => {
        return (
            <li key={index}>{item.title}</li>
          )
      })
      const AuthorList = test.map((item, index) =>{
        return (
          <div>
                            <Collapsible trigger={item.title} key={index} lazyRender={true}>
                                            {item.author.map((auth, index) =>
                                                      <Collapsible trigger={auth.given + " " + auth.family}>
                                                          <button key={index} onClick={ (e) => this.handleClick(e, (auth.given + "+" + auth.family).toLowerCase())}>TestButton</button>
                                                          {this.state.titleList}
                                                      </Collapsible>)}
                            </Collapsible>
          </div>
        )
      })

      return (
        <div>
        <input ref="query" onChange={ (e) => {this.updateSearch();}} type="text" />
          <div>
          {
            <div>
            {AuthorList}
            </div>
          }
          </div>
        </div>);
    }
}
  


export default App;
