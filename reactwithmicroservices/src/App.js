import "./App.css";

import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      languages: [{ id: 1, code: "tr", name: "türkçe" }],
      ekleneceklng: { id: 0, code: "", name: "" },
    };
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData = () => {
    fetch("http://localhost:3118/api/langs")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);
        this.setState({ languages: result });
      });
  };
  postData = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.ekleneceklng),
    };

    fetch("http://localhost:3118/api/langs", requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);
        //this.setState({ languages: result });
      });
  }

  setEklenecek=(event)=>{
    let existingState=this.state.ekleneceklng;
    existingState[event.target.name]= event.target.value;
    this.setState({ekleneceklng:existingState});
  }


  render() {
    return (
      <div className="container">
        <div>
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              {this.state.languages.map((lng) => {
                return (
                  <div key={lng.id}>
                    {lng.id} | {lng.code} | {lng.name}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                id:<input className="form-control" name="id" onChange={this.setEklenecek} type="text" value={this.state.ekleneceklng.id}/>
              </div>
              <div className="form-group">
                code:<input className="form-control" name="code" onChange={this.setEklenecek} type="text" value={this.state.ekleneceklng.code}/>
              </div>
              <div className="form-group">
                name:<input className="form-control" name="name" onChange={this.setEklenecek} type="text" value={this.state.ekleneceklng.name}/>
              </div>
              <button onClick={this.refreshData}>Yenile</button>
              <button onClick={this.postData}>Kaydet</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;