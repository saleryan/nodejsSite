
/*
* GET home page.
*/

var posts = require('../data/models/posts');
exports.index = function (req, res, next) {

    //console.log("page "+req.query.page);
    var maxPostsPerPage = 3;

    var pageNo = req.query.page ? req.query.page : 0;
    var start = pageNo * maxPostsPerPage;

    //  posts.len(function (err, len) {
    posts.recentPosts(start, maxPostsPerPage, function (err, allPosts) {
        if (err) {
            return next(err);
        }
        posts.count(function (err, c) {
            var maxPage = Math.ceil(c / maxPostsPerPage);
            if (c > 0) {
                res.render('index', {

                    posts: allPosts, page: pageNo, lastPage: maxPage
                });
            }
            else {
                res.render('index');
            }
        });
    });
};