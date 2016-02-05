import React from 'react';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';

const iconButtonElement = (
  <IconButton>
    <MoreVertIcon color={Colors.grey400}/>
  </IconButton>
);

const listItemStyle = {
  padding: '0px !important',
  'paddingLeft': '10px',
  'fontSize': '14px',
  'backgroundColor': 'white'
};

let NoteItem = React.createClass({

  getStyle(index) {
    return {
      'top': (this.props.index * -13)+'px'
    }
  },

  onNoteDelete() {
    this.props.onNoteDelete(this.props.note);
  },

  render(){
    var props = this.props,
      note = props.note,
      rightIconMenu = React.createElement(IconMenu, {
        onNoteDelete: this.onNoteDelete,
        iconButtonElement: iconButtonElement
      }, <MenuItem onClick={this.onNoteDelete}>Delete</MenuItem>);

    return (
      <div className="noteItemWrap" style={this.getStyle()}>
        <ListItem style={listItemStyle} className="noteItem"
                  onClick={function() {props.onNoteSelect(note.id);}}
                  rightIconButton={rightIconMenu} primaryText={note.get('t')}
                  secondaryText={<span className="noteText">{note.get('c')}</span>}
                  secondaryTextLines={2}
          >
          <div className="noteTime">{note.getDate()}</div>
        </ListItem>
      </div>
    );
  }
});

export default React.createClass({

  componentWillUnmount: function () {
    this.props.notes.off(null, null, this);
  },

  componentDidMount: function () {
    this.props.notes.on('add remove change', this.forceUpdate.bind(this, null));
  },

  render(){
    var props = this.props,
      notes = props.notes;

    return (
      <div className="noteListWrap">

        <List className="noteList">
          {notes.map(function (note, index) {
            return <NoteItem index={index}
              onNoteSelect={props.onNoteSelect} onNoteDelete={props.onNoteDelete}
              key={note.id} note={note}/>
          })}
        </List>

        <div className="noteListActions">
          <span style={{'float':'left', 'fontSize': '10px'}}>Last updated at: {notes.first().getDate()}</span>
          <span style={{'float':'right', 'cursor': 'pointer'}} onClick={props.onClearNotes}>{'Delete All ('+ notes.length + ')'}</span>
        </div>
      </div>
    );
  }
});
