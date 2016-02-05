import React from 'react';

import TextField from 'material-ui/lib/text-field';

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';


let newBtnStyle = {
  position: 'absolute',
  bottom: '10px',
  right: '10px',
  color: '#388E3C'
};

export default React.createClass({

  onNoteChange() {
    var that = this,
      refs = that.refs;

    that.props.noteModel.save({
      t: refs.title.getValue(),
      c: refs.content.getValue(),
      d: +new Date()
    });
  },

  render(){
    var noteModel = this.props.noteModel;

    return (
      <section className="noteBook">

        <TextField
          ref="title"
          fullWidth={true} className="noteTitle" hintText="Note Title"
          value={noteModel.get('t')}
          onChange={this.onNoteChange}
          />

        <TextField
          ref="content"
          hintText="Enter Note Content" fullWidth={true} multiLine={true} rows={10}
          onChange={this.onNoteChange} className="noteText"
          value={noteModel.get('c')}
          />

        <FloatingActionButton backgroundColor={'#4caf50'} style={newBtnStyle} className="newNoteBtn" onClick={this.props.onNewNoteAdd}>
          <ContentAdd />
        </FloatingActionButton>

      </section>
    );
  }
});
