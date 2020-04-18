const global_options = {
	s: {
		min: 0.0001,
		max: 2*Math.PI,
		count: 55
	},
	t: {
		min: 0.0001,
		max: 1,
		count: 20
	},
	s_max: 100,
	t_max: 100,

	func_x: (s, t) => {return t * Math.cos(s)},
	func_y: (s, t) => {return t * Math.sin(s)},

	transpositions: function(func_c) {
		return {
			trans_x: function(p, s, t) {
				let fx = global_options.func_x(s, t);
				let fy = global_options.func_y(s, t);
				let c = func_c(fx, fy);

				return p * fx + (1 - p) * c.re;
			},
			trans_y: function(p, s, t) {
				let fx = global_options.func_x(s, t);
				let fy = global_options.func_y(s, t);
				let c = func_c(fx, fy);

				return p * fy + (1 - p) * c.im;
			}
		}
	},

	moves_count: 80
};

const func_data = [
{
	katex_func: "f(z) =  \\cfrac{1}{z - 1}",

	transpositions: function() {
		let func_c = (a, b) => new Complex(1).div(new Complex(a, b).sub(1));
		return global_options.transpositions(func_c);
	}

},{	
	katex_func: "f(z) =  -i \\cfrac{z + 1}{z - 1}",

	transpositions: function() {
		let func_c = (a, b) => new Complex(a, b).add(1).div(new Complex(a, b).sub(1)).mult(new Complex(0, -1));
		return global_options.transpositions(func_c);
	}

},{	
	katex_func: "f(z) =  \\cfrac{z + i}{-z + i}",

	transpositions: function() {
		let func_c = (a, b) => new Complex(a, b).add(Complex.I).div(new Complex(-a, -b).add(Complex.I));
		return global_options.transpositions(func_c);
	}

},{	
	katex_func: "f(z) =  \\cfrac{i - iz}{z + 2}",

	transpositions: function() {
		let func_c = (a, b) => (Complex.I).sub(new Complex(a, b).mult(Complex.I)).div(new Complex(a, b).add(2));
		return global_options.transpositions(func_c);
	}

}
];