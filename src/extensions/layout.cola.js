;(function($$){ 'use strict';

  // default layout options
  var defaults = {
    ready: function(){}, // on layoutready
    stop: function(){} // on layoutstop
  };

  // constructor
  // options : object containing layout options
  function ColaLayout( options ){
    this.options = $$.util.extend(true, {}, defaults, options); 
  }

  // runs the layout
  ColaLayout.prototype.run = function(){
    var options = this.options;
    var cy = options.cy; // cy is automatically populated for us in the constructor

    // puts all nodes at (0, 0)
    cy.nodes().positions(function(){
      return {
        x: 0,
        y: 0
      };
    });

    // trigger layoutready when each node has had its position set at least once
    cy.one('layoutready', options.ready);
    cy.trigger('layoutready');

    // trigger layoutstop when the layout stops (e.g. finishes)
    cy.one('layoutstop', options.stop);
    cy.trigger('layoutstop');
  };

  // called on continuous layouts to stop them before they finish
  ColaLayout.prototype.stop = function(){
    var options = this.options;
    var cy = options.cy;

    cy.one('layoutstop', options.stop);
    cy.trigger('layoutstop');
  };

  // register the layout
  $$('layout', 'cola', ColaLayout);

})(cytoscape);