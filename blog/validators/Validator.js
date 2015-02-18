App.Validators.Validator = (function(){

	function Validator(){

	}

	Validator.isEmpty = function(str){

		if (str.length === 0){
			return true;
		}

		return false;
	}

	Validator.isBetween = function(arg, min, max){

		if (typeof arg === 'string' && typeof min === 'number' && typeof max === 'number') {
    		
    		if (arg.length < min || arg.length > max){
				
				return false;
			}
		}

		if (arg instanceof Date && min instanceof Date && max instanceof Date) {
    		
    		var date = new Date(arg).getTime();
			var minDate = new Date(min).getTime();
			var maxDate = new Date(max).getTime();

			if (isNaN(date) == true){
				return false;
			}

			if (date< minDate || date > maxDate){
				return false;
			}

		}
		
	
		return true;

	}

	/*Validator.isDateBetween = function(date, minDate, maxDate){

		//debugger;
		
		var date = new Date(date).getTime();
		var minDate = new Date(minDate).getTime();
		var maxDate = new Date(maxDate).getTime();

		if (isNaN(date) == true){
			return false;
		}

		if (date< minDate || date > maxDate){
			return false;
		}


		return true;


	}
*/
	return Validator;

})();

