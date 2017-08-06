var React = require('react');

var Clickable = React.createClass ({

    handleClick: function() {
        this.props.onClick(this.props.sortType, this.props.index);
    },

    render: function () {
        return <img className={this.props.isActive ? 'currentArrow' : 'arrow'} onClick={this.handleClick}
                    src={this.props.src}/>
    }
});

module.exports = Clickable;