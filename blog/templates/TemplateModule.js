TemplateModule = (function(){

	var TemplateModule = {},
		cachedData = {};

	_.templateSettings = {
  		interpolate : /\{\{(.+?)\}\}/g
  		// evaluate:    /\{\{(.+?)\}\}/g,
    // 	interpolate: /\{\{=(.+?)\}\}/g,
    // 	escape:      /\{\{-(.+?)\}\}/g
	};

	TemplateModule.register = function(templatePath, callback) {
		var id = templatePath.split('/').pop();

		$.get(templatePath, function(templateContent) {
			cachedData[id] = templateContent;

			if (callback) {
				callback(cachedData[id]);
			}
		});

	}

	TemplateModule.render = function(templateFile, model, callback) {
		var renderedTemplate;

		if (cachedData[templateFile]) {
			renderedTemplate = _.template(cachedData[templateFile])(model);

			if (callback) {
				callback(renderedTemplate);
			}
		} else {
			TemplateModule.register('templates/' + templateFile, function(htmlData) {
				renderedTemplate = _.template(cachedData[templateFile])(model);

				if (callback) {
					callback(renderedTemplate);
				}
			});
		}
	}

	return TemplateModule;
})();

// TemplateModule.register('templates/myTemplate.html');

/*

TemplateModule.render('myTemplate.html', {
	summary: ''
}, function(renderedTemplate) {
	$('content').append(renderedTemplate);
});

*/