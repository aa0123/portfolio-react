import React, { Component } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm.jsx';
import SearchSortList from './SearchSortList.jsx';
import SearchDetails from './SearchDetails.jsx';
import SearchLanguageList from './SearchLanguageList.jsx';
import lda from '../../../lda';


class GitMango extends Component {
  constructor() {
    super();
    this.state = {
      gitun: 'No username',
      infoclean : '',
      info: '',
      formData: {
        username: '',
      },
      repitems: null,
      staritems: null,
      replanguagecount: {},
      keywords: null
      
    }
    this.handleUserFormSubmit = this.handleUserFormSubmit.bind(this);
    this.handleFormChange= this.handleFormChange.bind(this);
  }

  handleUserFormSubmit(event) {
    event.preventDefault();

    axios.get('https://api.github.com/users/'+this.state.formData.username)
    .then(response => this.setState({
      gitun: response.data.login,
      infoclean: response.data,
      info : JSON.stringify(response.data, undefined, 2)
    })).catch((err) => { console.log(err); });

    axios.get('https://api.github.com/users/'+this.state.formData.username+'/repos')
    .then(response => {
      var itemsWithFalseForks = response.data.filter(item => item.fork === false)
      var sortedItems = itemsWithFalseForks.sort((b,a) => {
        
        if((a.watchers_count +  a.forks_count) < (b.forks_count + b.watchers_count)){
          return -1
        } 
        else if ((a.watchers_count +  a.forks_count) > (b.forks_count + b.watchers_count)){
          return 1

        } 
        else {
          return 0
        }
      })

      let dictrlc = Object.assign({}, this.state.replanguagecount);
      for (var i = 0; i < itemsWithFalseForks.length; i++) {
          dictrlc[itemsWithFalseForks[i]['language']] = -~ dictrlc[itemsWithFalseForks[i]['language']]
      }

      this.setState({
        repitems: sortedItems.slice(0,10),
        replanguagecount: dictrlc,
      })

    }).catch((err) => { console.log(err); })

    axios.get('https://api.github.com/users/'+this.state.formData.username+'/starred')
    .then(response => {
      var itemsWithFalseForks = response.data.filter(item => item.fork === false)
      var sortedItems = itemsWithFalseForks.sort((b,a) => {

        if((a.watchers_count +  a.forks_count) < (b.forks_count + b.watchers_count)){
          return -1
        }
        else if ((a.watchers_count +  a.forks_count) > (b.forks_count + b.watchers_count)){
          return 1
        }
        else {
          return 0
        }
      })

      var documents = []
      for (var i = 0; i < response.data.length; i++) {
          var descr = response.data[i]['description']
          if (descr != null) {
            var newtext = descr.match(/[^.!?]+[.!?]+/g)
            if (newtext != null) {
              documents = documents.concat(newtext)
            }
          }
      }
      var result = lda(documents, 3, 3);
      var keywords = new Set()
      for (var k = 0; k < 3; k++) {
        for (var j = 0; j < 3; j++) {
          keywords = keywords.add(result[k][j]['term']);
        }
      }

      this.setState({
        staritems: sortedItems.slice(0,10),
        keywords: Array.from(keywords).join(', ')
      })

    }).catch((err) => { console.log(err); })

  };

  handleFormChange(event) {
    const obj = this.state.formData;
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };

  render() {
    return (
        <div>
            <h2 className="major">GitMango</h2>
            <span className="image main"><img src="assets/images/pic01.jpg" alt="" /></span>
            <SearchForm
                formData={this.state.formData}
                handleUserFormSubmit={this.handleUserFormSubmit}
                handleFormChange={this.handleFormChange}
            />
            <p>Profile Details</p>
            <SearchDetails infoclean={this.state.infoclean}/>
            <p>Own Repositories</p>
            <SearchSortList repitems={this.state.repitems}/>
            <p>Starred Repositories</p>
            <SearchSortList repitems={this.state.staritems}/>
            <p>Own Repos Language Count</p>
            <SearchLanguageList langslist={this.state.replanguagecount}/>
            <p>Keywords:  {this.state.keywords}</p>				  
        </div>

    );
  }
}
export default GitMango;