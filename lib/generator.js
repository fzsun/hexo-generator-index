'use strict';

var pagination = require('hexo-pagination');

module.exports = function (locals) {
  var config = this.config;
  // var posts = locals.posts.sort(config.index_generator.order_by);
  var paginationDir = config.pagination_dir || 'page';
  var path = config.index_generator.path || '';
  // 魔改开始 https://sevming.github.io/Hexo/hexo-custom-post-collation.html
  var posts = locals.posts;
  posts.data = posts.data.sort(function (a, b) {
    return (b.lastupdate ? b.lastupdate : b.date) - (a.lastupdate ? a.lastupdate : a.date);
  });
  // 魔改结束
  return pagination(path, posts, {
    perPage: config.index_generator.per_page,
    layout: ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });
};