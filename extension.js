const St = imports.gi.St;
const Main = imports.ui.main;
const MainLoop = imports.mainloop;

// THIS LINE IS IMPORTANT - IT ALLOWS US TO CALL TERMINAL COMMANDS
const GLib =imports.gi.GLib;

let panelButton, panelButtonText, timeout;

// This function allows us to update the text shown in the taskbar panel
function setButtonText () {
	
	//var [ok, out, err, exit] = GLib.spawn_command_line_sync('ls ~/.config/PulseEffects/output/');
	var [ok, out, err, exit] = GLib.spawn_command_line_sync('date');

	panelButtonText.set_text( out.toString());
	return true;
}

// We'll explore this to get us a list of output presets
function getPulseEffectPresets () {
	//One method to get our list of all input and output presets
	// "pulseefftect -p"

	//Nicer way to get *just* output preset names - it includes the .json extension though... we can trim this, innit
	// "ls ~/.config/PulseEffects/output/"
	// cd ~/.config/PulseEffects/output/
	// declare -a pePresets
	// for file in *.json; do
	//   pePresets+=( "${file%.json}" )
	// done

}

// we'll give it an imput later, but this loads our selected preset
function setPulseEffectsPreset () {
	// "pulseeffects -l [name of preset]"
}

// Initialise out Gnome Shell Extension
function init () {
	panelButton = new St.Bin({
		style_class : "panel-button"
	}); 

	panelButtonText = new St.Label({
		style_class : "examplePanelText", 
		text : "PulseEffects - Presets"
	});
	panelButton.set_child(panelButtonText);

}

// We do this from Gnome Tweaks
function enable (){
	Main.panel._rightBox.insert_child_at_index(panelButton, 1);
	
	timeout = MainLoop.timeout_add_seconds(1.0, setButtonText);	

}


function disable () {
	
	MainLoop.source_remove(timeout);

	Main.panel._rightBox.remove_child(panelButton);

}

