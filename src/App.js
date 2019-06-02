import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AppStyle from './AppStyle';
import GameDetails from "./GameDetails";

class App extends React.Component{
  constructor(props){
    super(props);
  this.state = {
    isSorted: false,
    gamesInformation:undefined,
    error:null,
      previousOffset:0,
      nextOffset:10,
    searchValue:undefined,
      isRowClicked:false,
      renderedData:undefined
  };
  this.renderTableData=this.renderTableData.bind(this);
  this.handleChangeSearchInput=this.handleChangeSearchInput.bind(this);
  this.tableRenderingFunction=this.tableRenderingFunction.bind(this);
  this.rowRenderingFinction=this.rowRenderingFinction.bind(this);
  this.handleSorting=this.handleSorting.bind(this);
  this.handleRowSelection=this.handleRowSelection.bind(this);

}

componentDidMount(){
  this.setState({gamesInformation:this.props.dataSet })
}

  
 
  handleChangeSearchInput(event){   
        if(event){
          const searchString=event.currentTarget.value;
          this.setState({searchValue:searchString });
        }
    }
  renderTableData(){
    const {gamesInformation, isSorted}=this.state;
    var sortedGameInfo;
      const {searchValue}=this.state;
      console.log("search value is",this.state)

    if(gamesInformation && gamesInformation.length>0) {
        if (isSorted === true) {
            if(searchValue && searchValue.trim().length > 0){
                sortedGameInfo = gamesInformation.filter(row => {
                    if (row["Name"]) {
                        return row["Name"].toLowerCase().startsWith(searchValue.toLowerCase())
                    } else return false
                })
            }else{
                sortedGameInfo = gamesInformation
            }
            sortedGameInfo = sortedGameInfo.sort(function (a, b) {
                return (parseInt(a.Year) - parseInt(b.Year));
            })
            return sortedGameInfo
        } else if (isSorted === false) {
            if(searchValue && searchValue.trim().length > 0){
                sortedGameInfo = gamesInformation.filter(row => {
                    if (row["Name"]) {
                        return row["Name"].toLowerCase().startsWith(searchValue.toLowerCase())
                    } else return false
                })
            }else{
                sortedGameInfo = gamesInformation
            }
            sortedGameInfo = sortedGameInfo.sort(function (a, b) {
                return (parseInt(a.Rank) - parseInt(b.Rank));
            })
            return sortedGameInfo

        }
    }
  }
  tableRenderingFunction(game, index){
    const {searchValue}=this.state;
    console.log("search value is",searchValue)
    if(game && searchValue && searchValue.length>0 && game["Name"]!==undefined){
      const str=game["Name"];
    const lowerStr=str.toLowerCase();
    const lowerSearchString=searchValue.toLowerCase();
    if (lowerStr.includes(lowerSearchString) ) {
     return this.rowRenderingFinction(game,index);
      }
    }
      else if(game){
      return this.rowRenderingFinction(game,index);
      }
  };
  rowRenderingFinction(game,index){
      if(game.Rank!=='') {
          return (
              <TableRow key={index} onClick={()=>this.handleRowSelection(game)}>
                  <TableCell>{game.Rank}</TableCell>
                  <TableCell>{game.Genre}</TableCell>
                  <TableCell>{game.Global_Sales}</TableCell>
                  <TableCell>{game.Name}</TableCell>
                  <TableCell>{game.Platform}</TableCell>
                  <TableCell>{game.Publisher}</TableCell>
                  <TableCell>{game.Year}</TableCell>
              </TableRow>
          )
      }
  }

  handleRowSelection(game){
      if(game){
          this.setState({isRowClicked:!this.state.isRowClicked,renderedData:game});
      }

    }

  handleSorting(event){
    if(event){
      this.setState({isSorted:!this.state.isSorted,previousOffset:0,nextOffset:10});
    }

  }
  tableRenderingPage(){
      const { classes } = this.props;
      return(
          <div>
              <div className={classes.searchBarLayout}>
                  <div className={classes.searchBarWidth}>
                      <form >
                          <input type="text" placeholder="Search..." name="search2" className={classes.inputStyle} onChange={this.handleChangeSearchInput} />
                          <button type="submit" className={classes.buttonStyle}>Search</button>
                      </form>
                  </div>
                  <div className={classes.filterBarWidth}>
                      <Button variant="contained" color="primary" onClick={this.handleSorting}>{this.state.isSorted ? "SORT BY RANK" : "SORT BY YEAR"}</Button>
                  </div>
              </div>
              <div>
                  <Card className={classes.card}>
                      <Table className={classes.tableLayout}>
                          <TableHead>
                              <TableRow>
                                  <TableCell>Rank</TableCell>
                                  <TableCell>Genre</TableCell>
                                  <TableCell>Global_Sales</TableCell>
                                  <TableCell>Name</TableCell>
                                  <TableCell>Platform</TableCell>
                                  <TableCell>Publisher</TableCell>
                                  <TableCell>Year</TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {/*{this.renderTableData()}*/}
                              {this.state.gamesInformation && this.renderTableData().slice(this.state.previousOffset,this.state.nextOffset).map((game,index) => {
                                  return(
                                      <TableRow key={index} onClick={()=>this.handleRowSelection(game)}>
                                          <TableCell>{game.Rank}</TableCell>
                                          <TableCell>{game.Genre}</TableCell>
                                          <TableCell>{game.Global_Sales}</TableCell>
                                          <TableCell>{game.Name}</TableCell>
                                          <TableCell>{game.Platform}</TableCell>
                                          <TableCell>{game.Publisher}</TableCell>
                                          <TableCell>{game.Year}</TableCell>
                                      </TableRow>
                                  )
                              })}
                          </TableBody>
                      </Table>
                      <div className={classes.paginationButtons}>
                          {this.state.previousOffset >= 10 && <Button color={"secondary"} onClick={() => this.setState({previousOffset:this.state.previousOffset - 10,nextOffset:this.state.previousOffset})}>{"Previous"}</Button>}
                          <Button color={"secondary"} onClick={() => this.setState({previousOffset:this.state.nextOffset,nextOffset:this.state.nextOffset + 10})}>{"Next"}</Button>
                      </div>
                  </Card>

              </div>
          </div>
      );
  }

  
  render(){

    const renderingContent=this.state.isRowClicked ? <GameDetails isRowClicked={this.state.isRowClicked} renderedData={this.state.renderedData} handleRowSelection={this.handleRowSelection}/>:this.tableRenderingPage();
  return (
      <div>
          {renderingContent}
      </div>

  );
  }
}

export default withStyles(AppStyle)(App);
