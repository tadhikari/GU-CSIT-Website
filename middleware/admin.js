

module.exports = function (req, res, next){
	console.log(req.user)
	if(!req.user.adminPrivilege) return res.status(403).send('Access denied, you are not an administrator')

		next()
}