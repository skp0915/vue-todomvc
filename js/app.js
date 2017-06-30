(function (exports) {
	'use strict';
	var filters={
		all:function(todos){
			return todos;
		},
		active:function(todos){
			return todos.filter(function(todo){
				return !todo.completed
			})
		},
		completed:function(todos){
			return todos.filter(function(todo){
				return todo.completed
			})
		}
	}
	exports.app = new Vue({
		el:'.todoapp',
		data:{
			todos:todoStorage.fetch(),
			newTodo:'',
			editedTodo:null,
			visibility:'all'
		},
		watch:{
			todos:{
				deep:true,
				handler:todoStorage.save
			}
		},
		computed:{
			filteredTodos:function(){
				return filters[this.visibility](this.todos);
			},
			activeCount:function(){
				return filters.active(this.todos).length;
			},
			allDone:{
				get:function(){
					return this.todos.length!=0&&this.activeCount===0;
				},
				set:function(value){
					this.todos.forEach(function(todo){
						todo.completed=value;
					})
				}
			}
		},
		methods:{
			addTodo:function(){
				// console.log("已经帮你添加了");
				if(!this.newTodo){
					return;
				}
				this.todos.push({
					id:this.uuid(),
					title:this.newTodo,
					completed:false
				})
				this.newTodo='';
			},
			removeTodo:function(todo){
				var index=this.todos.indexOf(todo);
				// console.log(index);
				this.todos.splice(index,1);
			},
			editTodo:function(todo){
				// console.log("正在编辑")
				this.editedTodo=todo;
				this.cacheTodoTitle=todo.title;
			},
			doneEdit:function(todo){
				if(!todo.title.trim()){
					this.removeTodo(todo);
				}
				this.editedTodo=null;
			},
			cancelEdit:function(todo){
				todo.title=this.cacheTodoTitle;
				this.editedTodo=null;
			},
			uuid: function () {
				/*jshint bitwise:false */
				var i, random;
				var uuid = '';

				for (i = 0; i < 32; i++) {
					random = Math.random() * 16 | 0;
					if (i === 8 || i === 12 || i === 16 || i === 20) {
						uuid += '-';
					}
					uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
						.toString(16);
				}

				return uuid;
			}
		},
		directives:{
			'todo-focus':function(el,binding){
				if(binding.value){
					el.focus();
				}
			}
		},
		filters:{
			pluralize: function (count, word) {
				return count === 1 ? word : word + 's';
			}
		}
	})
})(window);
