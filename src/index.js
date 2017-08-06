var React = require('react');
var ReactDOM = require('react-dom');

var Clickable = require('./components/Clickable.js');

var loadingSample = {username: "loading ... ", recent: "loading ... ", alltime: "loading ... "};
var loading=[];
var pushSample = function() {
    for (var i=0; i <100; i++) {
        loading.push(loadingSample);
    }
};
pushSample();

/*Sort Functions*/
function sortDescending(property) {
    return function (a,b) {
        return (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
    }

}

function sortAscending(property) {
    return function (a,b) {
        return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    }
}


var LeaderBoard = React.createClass({

    getInitialState: function() {
        return {
            data: loading,
            activeIndex: 3
        };
    },

    handleClick: function(sortType, index) {
        const sortedData = this.state.data.slice();

        if (sortType.direction === "descending") {
            sortedData.sort(sortDescending(sortType.filter));
        }
        else if (sortType.direction === "ascending") {
            sortedData.sort(sortAscending(sortType.filter));
        }
        this.setState({
            activeIndex: index,
            data: sortedData
        });
    },

    componentWillMount: function() {
        fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent', {
            method: 'get'
        }).then(response => response.json()).then(data => {
            this.setState({
                data: data,
            });
        }).catch(function(error) {
            console.log("error is ", error);
        });
    },

    render: function() {
        var information = [];
        for (var j=0; j<100; j++) {
            information.push(
                <div className="row">
                    <div className="col-md-1 col-xs-1">
                        <h4>{j+1}</h4>
                    </div>
                    <div className="col-md-4 col-xs-4">
                        <h4>{this.state.data[j].username}</h4>
                    </div>
                    <div className="col-md-4 col-xs-4">
                        <h4>{this.state.data[j].recent}</h4>
                    </div>
                    <div className="col-md-3 col-xs-3">
                        <h4>{this.state.data[j].alltime}</h4>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <div id="Title" className="row">
                    <h1>freeCodeCamp Leaderboard</h1>
                </div>
                <div className="row">
                    <div className="col-md-1 col-xs-1">
                        <h4>#</h4>
                    </div>
                    <div className="col-md-3 col-xs-3">
                        <h4>Camper Name
                            <Clickable index={0}
                                isActive={this.state.activeIndex===0}
                                onClick={(sortType, index) => this.handleClick(sortType, index)}
                                sortType = {{direction: 'ascending', filter: 'username'}}
                                src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-up-b-128.png"
                            />
                            <Clickable index={1}
                                isActive={this.state.activeIndex===1}
                                onClick={(sortType, index) => this.handleClick(sortType, index)}
                                sortType = {{direction: 'descending', filter: 'username'}}
                                src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-down-b-128.png"
                            />
                        </h4>
                    </div>
                    <div className="col-md-5 col-xs-5">
                        <h4>Points in past 30 days
                            <Clickable index={2}
                                 isActive={this.state.activeIndex===2}
                                 onClick={(sortType, index) => this.handleClick(sortType, index)}
                                 sortType = {{direction: 'ascending', filter: 'recent'}}
                                 src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-up-b-128.png"
                            />
                            <Clickable index={3}
                                 isActive={this.state.activeIndex===3}
                                 onClick={(sortType, index) => this.handleClick(sortType, index)}
                                 sortType = {{direction: 'descending', filter: 'recent'}}
                                 src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-down-b-128.png"
                            />
                        </h4>
                    </div>
                    <div className="col-md-3 col-xs-3">
                        <h4>All time points
                            <Clickable index={4}
                                 isActive={this.state.activeIndex===4}
                                 onClick={(sortType, index) => this.handleClick(sortType, index)}
                                 sortType = {{direction: 'ascending', filter: 'alltime'}}
                                 src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-up-b-128.png"
                            />
                            <Clickable index={5}
                                 isActive={this.state.activeIndex===5}
                                 onClick={(sortType, index) => this.handleClick(sortType, index)}
                                 sortType = {{direction: 'descending', filter: 'alltime'}}
                                 src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-down-b-128.png"
                            />
                        </h4>

                    </div>
                </div>
                <div>{information}</div>
            </div>
        );
    }

});


ReactDOM.render(<LeaderBoard />, document.getElementById('theBoard'));
