import Backbone from 'backbone';
import BackboneLocalStorage from 'backbone.localstorage';

const LS_KEY = '~~notes~~';

export default Backbone.Collection.extend({

  model: Backbone.Model.extend({

    defaults: {
      t: 'Untitled Note',
      c: ''
    },

    getDate: function() {
      return new Date(this.get('d')).ddmm();
    }
  }),

  //localStorage adapter for Backbone. It's a drop-in replacement for Backbone.Sync() to handle saving to a localStorage database
  //https://github.com/jeromegn/Backbone.localStorage
  localStorage: new BackboneLocalStorage(LS_KEY),

  comparator: function(note) {
    return -note.get('d');
  },

  clearNotes: function () {
    this.localStorage._clear();
    this.fetch();
  },

  createNew: function () {
    return Backbone.Collection.prototype.create.call(this, {
      d: +new Date()
    }, {
      silent: true
    });
  },

  fetch: function () {
    Backbone.Collection.prototype.fetch.apply(this, arguments);

    if (!this.length) {
      this.createNew();
    }

    return this;
  }

});
