import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Request from 'superagent';
import _ from 'lodash';

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

import './react-accessible-accordion.css';


class App extends Component {
    constructor(props){
    super(props);
    this.state = {
      data: [],
      items: [],
      title: "",
      author: [],
      activeItems: [0, 1],
    };
    this.changeActiveItems = this.changeActiveItems.bind(this);
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
             <Accordion>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3 className="u-position-relative" key={index}>
                                {item.title}
                                <div className="accordion__arrow" role="presentation" />
                            </h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <Accordion accordion={false}>
                                <AccordionItem>
                                    <AccordionItemTitle>
                                        <h3 className="u-position-relative">
                                            {item.author.map((auth, index) =>
                                                <li key={index}>{auth.given + " " + auth.family}</li>
                                            )}
                                            <div className="accordion__arrow" role="presentation" />
                                        </h3>
                                    </AccordionItemTitle>
                                    <AccordionItemBody>
                        <p>Test4</p>
                                    </AccordionItemBody>
                                </AccordionItem>

                                
                            </Accordion>
                        </AccordionItemBody>
                    </AccordionItem>
                </Accordion>
          </div>
        )
      })

      return (
        <div>Hello
        <input ref="query" onChange={ (e) => {this.updateSearch();}} type="text" />
          <div>
          {
            <div>
            <ul>{testList}</ul>
            {AuthorList}

            </div>
          }
          </div>
        </div>);
    }
}
  


export default App;
