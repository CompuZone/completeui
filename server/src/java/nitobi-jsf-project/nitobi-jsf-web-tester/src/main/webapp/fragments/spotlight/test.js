var j_id_id59 = function() {
    var spotlight = new nitobi.spotlight.Spotlight("GREYSWIPE", "peanut_exclam", "BURST", .3);
    spotlight.allowscrolling = true;
    spotlight.createCalloutStep('uselessarea', "Useless", "This area serves no purpose other than to be pointed at.");
    spotlight.createCalloutStep(null, "", "Your first step is to write your name. Select the name field and begin typing.");
    spotlight.createFormHelperStep(document.forms['plainform']['nameField2'], "TYPETEXT", 5000, "Joe Snuffy", true);
    spotlight.createFormHelperStep(document.forms['jsfform']['jsfform:nameField'], "TYPETEXT", 5000, "Joe Snuffy", true);
    spotlight.createCalloutStep(null, "Complete", "Your first line is complete");
    spotlight.createFocusStep('uselessarea', 3000);
    spotlight.createCalloutStep(null, "Repeat Instructions", "To repeat this tour, press the start button again.");
    spotlight.createMouseStep('CLICKONOBJECT', 'startButton', 3000);
    spotlight.createCodeStep(alert('congrats on finishing the tour!'), null);
    spotlight.play();
};
nitobi.html.attachEvent($('startButton'), "click", j_id_id59);