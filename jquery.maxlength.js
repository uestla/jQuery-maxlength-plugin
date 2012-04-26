/**
 * jQuery maxlength plugin
 *
 * Usage:
 *
 * $('textarea[maxlength]').maxlength({ <options> });
 *
 * Available options (defaults set):
 *
 * {
 *	okClass: 'maxlength-ok',
 *	failClass: 'maxlength-warning',
 *	leftWords: ['zbývá', 'zbývají', 'zbývá'] // [0] = for 1, [1] = for 2, 3 and 4, [2] = for more
 * }
 *
 * @version 1.0
 * @author kesspess
 */
(function ($) {

$.fn.extend({
	maxlength: function (o) {
		var $this = $(this),
			attrMaxLen = $this.attr("maxlength"),
			options = $.extend({
				okClass: 'maxlength-ok',
				failClass: 'maxlength-warning',
				leftWords: ['zbývá', 'zbývají', 'zbývá']
			}, o);

		if (!attrMaxLen) return ;

		var maxLen = parseInt( attrMaxLen ? attrMaxLen : 0, 10 ),
			$div = $("<div>"),
			process = function() {
				var left = parseInt( maxLen - $this.val().length, 10),
					limit = parseInt( Math.ceil( Math.log(maxLen) ), 10 );

				$div.text( left + (left == 1 ? options.leftWords[0]
					: (left == 2 || left == 3 || left == 4 ? " " + options.leftWords[1]
						: " " + options.leftWords[2])
					)
				);
				$div.removeClass( left <= limit ? options.okClass : options.failClass )
					.addClass( left <= limit ? options.failClass : options.okClass );
				return $div;
			};

		$this.after( process() );
		$this.bind("keyup.maxlength keydown.maxlength", process);
	}
});

})(jQuery);