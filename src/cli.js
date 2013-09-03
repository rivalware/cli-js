var cli = {
    fullscreen: false,
    width: 60,
    height: 35,
    bg_color: '#000000',
    fg_color: '#FFFFFF',
    prompt_color: '#00FF00',
    cursor_color: '#FFFFFF',
    command_buffer: 'help',
    
    prompt: 'rivalware/home>&nbsp;',

    init: function(fullscreen) {
	this.fullscreen = fullscreen

	this.screen = document.getElementById('cli');

	if (this.fullscreen) {
	    this.screen.classList.add('full-screen')
	}
	else {
	    this.screen.style.width = '' + this.width + 'em';
	    this.screen.style.height = '' + this.height + 'em';
	}
	this.screen.style['background-color'] = this.bg_color;
	this.screen.style.color = this.fg_color;
	this.screen.style.padding = '1em';
	this.screen.style['font-family'] = 'monospace';

	this.render();
	window.onkeypress = this.handle_character;
	window.onkeydown = this.handle_modifier;
    },

    handle_modifier: function(key) {
	var k = key.which;
	if (k === 8) {
	    cli.command_buffer = cli.command_buffer.slice(0, -1);
	    cli.render();
	    return;
	}
    },

    handle_character: function(key) {
	var k = key.which;
	var ch;
	if (k == 32) {
	    ch = '&nbsp;'
	}
	if (k === 13) {
	    cli.process_command();
	    return;
	}
	else if (!key.shiftKey) {
	    key -= 48;
	    ch = String.fromCharCode(k);
	}
	else {
	    ch = String.fromCharCode(k);
	}
	cli.command_buffer += ch;
	cli.render();
    },

    render: function() {
	var self = this;

	while (this.screen.lastChild) {
	    this.screen.removeChild(this.screen.lastChild);
	}
	
	var input = document.createElement('div');
	input.className = 'input';

	var prompt = document.createElement('span');
	prompt.innerHTML = this.prompt;
	prompt.style.color = this.prompt_color;
	prompt.style['font-weight'] = 'bold';

	var command = document.createElement('span');
	command.innerHTML = this.command_buffer;
	command.style.color = this.fg_color;
	command.style['font-weight'] = 'bold';

	var cursor = document.createElement('span');
	cursor.innerHTML = '&nbsp';
	cursor.style['background-color'] = this.cursor_color;
	cursor.on = true;
	this.cursor = cursor;

	input.appendChild(prompt);
	input.appendChild(command);
	input.appendChild(cursor);

	if (this.cursor_interval) {
	    clearInterval(this.cursor_interval);
	}
	this.cursor_interval = setInterval(function() {
	    if (self.cursor.on) {
		self.cursor.on = false;
		self.cursor.style['background-color'] = self.bg_color;
	    }
	    else {
		self.cursor.on = true;
		self.cursor.style['background-color'] = self.cursor_color;
	    }
	}, 750);
	
	this.screen.appendChild(input);
    },

    process_command: function() {
	this.command_buffer = "";
	this.render();
    }
};
