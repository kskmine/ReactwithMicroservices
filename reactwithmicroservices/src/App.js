import './App.css';
import axios from 'axios';
import React, { Component } from 'react';
import { AddLng } from './AddLng';

class App extends Component {

  constructor() {
    super();
    this.state = {
      languages: [
        { id: 1, code: 'tr', name: 'türkçe' }
      ],
      lngToUpdate:{id:0,code:'',name:''}
    }
  }
  componentDidMount() {
    this.refreshData();
  }

  refreshData=()=>{
    fetch("http://localhost:3118/api/Langs")
    .then((res) => { return res.json() })
    .then((result) => {
      console.log(result);
      this.setState({ languages: result });
    });
  }

  postData=(lng)=>{

    if(lng.id)
    {
      axios.put('http://localhost:3118/api/Langs/'+lng.id,lng)
    .then(()=>{this.refreshData()});
    }
    else
    {
    axios.post('http://localhost:3118/api/Langs',lng)
    .then(()=>{this.refreshData()});
    }
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(this.state.eklenecekLng)
  // };

  //   fetch("http://localhost:44238/api/langs",requestOptions)
  //   .then((res) => { return res.json() })
  //   .then((result) => {
  //     console.log(result);
  //    // this.setState({ languages: result });
  //   });
  }

  setEkelencek=(event)=>{
    let existingState=this.state.eklenecekLng;
    existingState[event.target.name]=event.target.value;
    this.setState({eklenecekLng:existingState});
  }

  UpdateLng=(id)=>{
 
    axios.get("http://localhost:3118/api/Langs/"+id)
   .then(response=>{this.setState({lngToUpdate:response.data})});
 // this.setState({lngToUpdate:this.state.languages.filter(c=>c.id===id)[0]});

  }

  render() {
    console.log("app");
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6'>
            {
              this.state.languages.map((lng) => {
                return <div key={lng.id}> <input type="button" onClick={()=>{this.UpdateLng(lng.id)}} value="updateLng"/>{lng.id} | {lng.code} | {lng.name}</div>
              })
            }
          </div>
        </div>
        <AddLng postData={this.postData}  lngToUpdate={this.state.lngToUpdate} />
      </div>
    );
  }
}

export default App;

