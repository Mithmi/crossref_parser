import React, { Component } from 'react';
import './App.css';
import Collapsible from 'react-collapsible';

import './sass/test.css';



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

    componentDidMount(){
      this.collapseRender();
    }

    collapseRender(){
      const message = this.state.items;
      const AuthorList = message.map((item, index) => {
        if(item.author == undefined){
          this.setState({
            item: []
          });} else {
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
      });}})
    }


    updateSearch(){
      this.search(this.refs.query.value);
    }

    search(query = ""){
      var url =`https://api.crossref.org/works?query.title=${query}&rows=5&mailto=workaintfun@yahoo.com`;
      return fetch(url).then((response) => response.json()).then((response) => {
        this.setState({
          data: response,
          items: response.message.items
        });
      });

    }

    search_by_author(query = ""){
      var url =`https://api.crossref.org/works?query.author=${query}&rows=5&mailto=@yahoo.com`;
      fetch(url).then((response) => response.json()).then((response) => {
        this.setState({
          authors: response.message.items
        });
        const author = this.state.authors;
        const titleList = author.map((titl, index) => {
          return (<li className="coolList">{titl.title}</li>)
        });
        this.setState({
          titleList: titleList
        });
      });

    }


    render(){
      console.log("Data", this.state.data.message);
      console.log("Items", this.state.items);
      console.log("Items2", this.state.items.author);

      return (
        <div>
        <div className="searchInput">
        <input ref="query" onChange={ (e) => {this.updateSearch();}} type="text" />
        </div>
          <div>
          {
            <div>
            {this.collapseRender();}
            </div>
          }
          </div>

        </div>);
    }
}
  


export default App;
