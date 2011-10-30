/**
 * 
 */
/*Utility*/
if (!document.getElementsByClassNames || !Object.prototype.getElementsByClassNames ) {
	Object.prototype.getElementsByClassNames = function (classNames, logic, scope) {
		//Get the scope (root element) or default to this document
		var scope = (typeof scope == 'object' ? scope : (typeof scope == 'string' ? document.getElementById(scope) : null)) || (this === document ? this.body : this);
		//Get array of class names
		var targetClassNames = (typeof classNames == 'string' ? classNames.split(/\s+/) : classNames);
		//Recursive core method
		var getElementsByClassNamesHelper = function (root, targetClassNames) {
			var elementsWithClassNames = [];
			if (root.nodeType === 1 && root.className !== undefined) {
				var sourceClassNames = root.className.split(/\s+/);
				var isMatch = false;
				switch (logic) {
					case "and":
						isMatch = and(targetClassNames, sourceClassNames);
						break;
					case "nand":
						isMatch = nand(targetClassNames, sourceClassNames);
						break;
					case "or":
						isMatch = or(targetClassNames, sourceClassNames);
						break;
					case "xor":
						isMatch = xor(targetClassNames, sourceClassNames);
						break;
					case "nor":
						isMatch = nor(targetClassNames, sourceClassNames);
						break;
					default:
						isMatch = and(targetClassNames, sourceClassNames);
				}
				if (isMatch) {
					elementsWithClassNames.push(root);
				}
				if (root.hasChildNodes && root.hasChildNodes()) {
					for (var k = 0; k < root.childNodes.length; k++) {
						var temp = elementsWithClassNames.concat(getElementsByClassNamesHelper(root.childNodes[k], targetClassNames));
						elementsWithClassNames = temp;
					}
				}
			}
			
			return elementsWithClassNames;
		};
		var and = function (target, source) {
			var isMatch = false;
			target.sort();
			source.sort();
			for (var i = 0; i < target.length; i++) {
				for (var j = 0; j < source.length; j++) {
					if (target[i] === source[j]) {
						isMatch = true;
						break;
					} else {
						isMatch = false;
					}
				}
				if (!isMatch) {
					break;
				}
			}
			return isMatch;
		};
		var nand = function (target, source) {
			var isMatch = false;
			target.sort();
			source.sort();
			for (var i = 0; i < target.length; i++) {
				for (var j = 0; j < source.length; j++) {
					if (target[i] !== source[j]) {
						isMatch = true;
					} else {
						isMatch = false;
						break;
					}
				}
				if (!isMatch) {
					break;
				}
			}
			return isMatch;
		};
		var or = function (target, source) {
			var isMatch = false;
			target.sort();
			source.sort();
			for (var i = 0; i < target.length; i++) {
				for (var j = 0; j < source.length; j++) {
					if (target[i] === source[j]) {
						isMatch = true;
						break;
					}
				}
				if (isMatch) {
					break;
				}
			}
			return isMatch;
		};
		var xor = function (target, source) {
			var isMatch = false;
			var matchCount = 0;
			target.sort();
			source.sort();
			for (var i = 0; i < target.length; i++) {
				for (var j = 0; j < source.length; j++) {
					if (target[i] === source[j]) {
						isMatch = true;
						matchCount++;
						break;
					}
				}
				if (matchCount > 1) {
					isMatch = false;
					break;
				}
			}
			return isMatch;
		};
		var nor = function (target, source) {
			return nand(target, source);
		};
		return getElementsByClassNamesHelper(scope, targetClassNames);
	};
}
