;(function(exports){
	'use strict';
	var TODO_KEY="todomvc-vuejs";
	exports.todoStorage={
		fetch:function(){
			return JSON.parse(localStorage.getItem(TODO_KEY)||'[]');
		},
		save:function(todos){
			localStorage.setItem(TODO_KEY,JSON.stringify(todos));
		}
	}
})(window);