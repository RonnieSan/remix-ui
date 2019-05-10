// -------------------------------------------------------
// TRIM LOADER
// Trim whitespace from the source
// -------------------------------------------------------

module.exports = function(source) {
	return source.trim().replace(/\t/g, '  ');
};