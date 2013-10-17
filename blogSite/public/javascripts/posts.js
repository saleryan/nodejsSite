var posts = [];

exports.addPost = function (title, entry) {
    console.log(title);
    console.log(entry);
    var currentDate=new Date();
    var formattedDate = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
    posts.push({ date: formattedDate ,title: title, entry: entry });
}

exports.getPosts = function () {

    return posts;
}