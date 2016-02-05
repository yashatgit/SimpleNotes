import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Styles from '../less/main.less';
import Paper from 'material-ui/lib/paper';

import NotePage from './notePage.js';
import NoteList from './noteList.js';
import Notes from './notes.js';
import Utils from './utils.js';

injectTapEventPlugin();

let AllNotes = new Notes();

let Notebook = React.createClass({

  getInitialState() {
    AllNotes.fetch();

    return {
      notes: AllNotes,
      activeNoteId: AllNotes.first().id
    }
  },

  componentDidMount: function () {
    this.state.notes.on('add remove change', this.forceUpdate.bind(this, null));
  },

  onClearNotes() {
    var notes = this.state.notes;

    notes.clearNotes();
    this.setState({activeNoteId: notes.first().id});
  },

  onNewNoteAdd() {
    var nowModel = this.state.notes.createNew();
    this.setState({activeNoteId: nowModel.id});
  },

  onNoteSelect(noteId) {
    this.setState({activeNoteId: noteId});
  },

  onNoteDelete(note) {
    note.destroy();

    if (!AllNotes.length) {
      AllNotes.createNew();
    }
    this.setState({activeNoteId: AllNotes.first()});
  },

  render(){
    var notes = this.state.notes;

    return (
      <Paper className="notebook-container" zDepth={2}>
        <NoteList
          onNoteDelete={this.onNoteDelete} onNoteSelect={this.onNoteSelect} onClearNotes={this.onClearNotes}
          notes={notes}/>
        <NotePage onNewNoteAdd={this.onNewNoteAdd} noteModel={notes.get(this.state.activeNoteId)}/>
      </Paper>
    );
  }

});

ReactDOM.render(
  <Notebook />,
  document.getElementById('app')
);
