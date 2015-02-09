$(document).ready(function() {

    game = new Game();

    Mousetrap.bind('left', function(event) {
      event.preventDefault();
      game.move('left');
    })

    Mousetrap.bind('right', function(event) {
      event.preventDefault();
      game.move('right');
    })

    Mousetrap.bind('up', function(event) {
      event.preventDefault();
      game.move('up');
    })

    Mousetrap.bind('down', function(event) {
      event.preventDefault();
      game.move('down');
    })

})
