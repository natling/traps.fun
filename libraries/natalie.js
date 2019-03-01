const randomIntegerInclusive = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomFloat = (min, max) => {
	return Math.random() * (max - min) + min;
}

const mod = (x, n) => (x % n + n) % n

const getBaseLog = (x, y) => Math.log(y) / Math.log(x)

const roundTo = (n, digits) => {
	if (digits === undefined) {
		digits = 0;
	}

	var multiplicator = Math.pow(10, digits);
	n = parseFloat((n * multiplicator).toFixed(11));
	return Math.round(n) / multiplicator;
}

const linlin = (value, inMin, inMax, outMin, outMax) => {
	return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

const coin = p => Math.random() < p

const weightedAverage = (values, weights) => {
	var weightedValuesSum = 0;
	var weightsSum = 0;

	for (let i = 0; i < values.length; i++) {
		weightedValuesSum += values[i] * weights[i];
		weightsSum += weights[i];
	}

	return weightedValuesSum / weightsSum;
}

const randomItem = array => array[Math.floor(Math.random() * array.length)]

const rotateArray = (array, distance, direction) => {
	for (let i = 0; i < distance; i++) {
		if (direction) {
			array.unshift(array.pop());
		} else {
			array.push(array.shift());
		}
	}
	return array;
}

const shuffleArray = array => {
	for (let i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

const pairwiseDo = (array, func) => {
	for (let i = 0; i < array.length - 1; i++) {
		func(array[i], array[i + 1], i);
	}
}

const separateArray = (array, func = () => true) => {
	var separatedArray = [];
	var subArray = [];

	pairwiseDo(array, (a, b, i) => {
		subArray.push(a);

		if (func(a, b, i)) {
			separatedArray.push(subArray);
			subArray = [];
		}
	})

	subArray.push(last(array));
	separatedArray.push(subArray);

	return separatedArray;
}

const create2DArray = (rows, columns) => {
	var x = new Array(rows);

	for (let i = 0; i < rows; i++) {
		x[i] = new Array(columns);
	}

	return x;
}

const last = array => array[array.length - 1]

const flatten = (ary, ret) => {
	ret = ret === undefined ? [] : ret;
	for (let i = 0; i < ary.length; i++) {
		if (Array.isArray(ary[i])) {
			flatten(ary[i], ret);
		} else {
			ret.push(ary[i]);
		}
	}
	return ret;
}

const interleave = () => {
	var arrs = [].slice.call(arguments);
	var maxLength = Math.max.apply(Math, arrs.map(arr => arr.length));

	var result = [];

	for (let i = 0; i < maxLength; ++i) {
		arrs.forEach(arr => {
			if (arr.length > i) {
				result.push(arr[i]);
			}
		});
	}

	return result;
}

const combinations = (array, k) => {
	if (k == 0) {
		return [[]];
	}

	if (k == array.length) {
		return [array];
	}

	var output = [];
	var subset = combinations(array.slice(1), k - 1);

	for (let i = 0; i < subset.length; i++) {
		output.push([array[0]].concat(subset[i]));
	}

	output.push(...combinations(array.slice(1), k));

	return output;
}

const permutations = array => {
	if (array.length == 1) {
		return array;
	}

	var output = [];

	for (let i = 0; i < array.length; i++) {
		var first = array[i];
		var rest  = array.slice(0, i).concat(array.slice(i + 1));

		var innerPermutations = permutations(rest);

		for (let j = 0; j < innerPermutations.length; j++) {
			output.push(([first].concat(innerPermutations[j])));
		}
	}

	return output;
}

const randomWalkInteger = (start, low, high, step) => {
	while (true) {
		var newStart = start + randomIntegerInclusive(-step, step);
		if (newStart >= low && newStart <= high) {
			return newStart;
		}
	}
}

const randomWalkFloat = (start, low, high, step) => {
	while (true) {
		var newStart = start + randomFloat(-step, step);
		if (newStart >= low && newStart <= high) {
			return newStart;
		}
	}
}

const getCharacterDimensions = character => {
	var p = document.createElement('p');
	p.appendChild(document.createTextNode(character));
	document.body.appendChild(p);
	p.style.position = 'absolute';
	var characterWidth  = p.clientWidth;
	var characterHeight = p.clientHeight;
	document.body.removeChild(p);
	return [characterWidth, characterHeight];
}