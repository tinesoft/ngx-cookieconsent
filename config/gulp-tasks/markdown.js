const gulp = require('gulp');
const helpers = require('../helpers');

const gulpRename = require('gulp-rename');
const gulpReplace = require('gulp-replace');
const gulpTap = require('gulp-tap');
const Handlebars = require('handlebars');
const Highlights = require('highlights');
const MarkdownIt = require('markdown-it');


const highligther = new Highlights();
const markdowniter = new MarkdownIt({
  highlight: function (code, lang) {
    let highlighted =
      highligther.highlightSync({
        fileContents: code,
        scopeName: 'source.js'
      });
    return highlighted;
  }
});

//Demo Tasks
gulp.task('markdown', () => {
  return gulp.src(helpers.root('./demo/src/app/getting-started/getting-started.component.hbs'))
    .pipe(gulpTap((file) => {
      let template = Handlebars.compile(file.contents.toString());

      return gulp.src(helpers.root('./README.md'))
        .pipe(gulpTap((file) => {
          // convert from markdown
          let mdContents = file.contents.toString();
          file.contents = new Buffer(markdowniter.render(mdContents), 'utf-8');
        }))
        .pipe(gulpTap((file) => {
          // file is the converted HTML from the markdown
          // set the contents to the contents property on data
          let data = { README_md: file.contents.toString() };
          // we will pass data to the Handlebars template to create the actual HTML to use
          let html = template(data);
          // replace the file contents with the new HTML created from the Handlebars template + data object that contains the HTML made from the markdown conversion
          file.contents = new Buffer(html, "utf-8");
        }))
        .pipe(gulpReplace(/(<p>&lt;p align=&quot;center&quot;&gt;[^]+?)(<h2>Dependencies<\/h2>)/, '$2'))// strips everything between start & '<h2 id="installation">'
        .pipe(gulpReplace('{', "{{ '{' }}")) // escapes '{' to comply with  angular parser
        .pipe(gulpRename('getting-started.component.html'))
        .pipe(gulp.dest(helpers.root('./demo/src/app/getting-started')));

    }));
});
