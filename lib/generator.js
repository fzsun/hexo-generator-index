'use strict';

var pagination = require('hexo-pagination');

module.exports = function(locals) {
  var config = this.config;
  // var posts = locals.posts.sort(config.index_generator.order_by);
  var paginationDir = config.pagination_dir || 'page';
  var path = config.index_generator.path || '';
  // 魔改开始 https://sevming.github.io/Hexo/hexo-custom-post-collation.html
  var posts = locals.posts;
  posts.data = posts.data.sort(function(a, b) {
    if(a.lastupdate && b.lastupdate) {
      // 若lastupdate一样, 按照文章日期降序
      if(a.lastupdate == b.lastupdate) {
        return b.date - a.date;
      }
      // 否则按照lastupdate降序
      else {
        return b.lastupdate - a.lastupdate;
      }
    }
    // a文章lastupdate有定义, b文章lastupdate没定义, 那么a文章lastupdate必须大于b文章的date, 即更新时间不能大于发布时间
    else if(a.lastupdate && !b.lastupdate) {
      return b.date - a.lastupdate;
    } else if(!a.lastupdate && b.lastupdate) {
      return b.lastupdate - a.date;
    }
    // 都没定义按照文章日期降序
    else {
      return b.date - a.date;
    }
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
