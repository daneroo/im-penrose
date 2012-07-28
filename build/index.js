#!/usr/bin/env node
var Handlebars = require('handlebars');
var fs    = require('fs');
var prod  = process.argv[2] == 'production';
var title = 'im-penrose';

// these variables are used for template content->compiled template (fn), rendered page
var layout, pages

// compile layout template
layout = fs.readFileSync(__dirname + '/../templates/layout.hbs', 'utf-8')
layout = Handlebars.compile(layout);//, { sectionTags: [{o:'_i', c:'i'}] })

// retrieve pages
pages = fs.readdirSync(__dirname + '/../templates/pages')

// iterate over pages
pages.forEach(function (name) {

  if (!name.match(/\.hbs$/)) return

  var page = fs.readFileSync(__dirname  + '/../templates/pages/' + name, 'utf-8');
  var context = {
      projectName:title
  }

  context[name.replace(/\.hbs$/, '')] = 'active'
  context.production = prod
  context.title = name
    .replace(/\.hbs/, '')
    .replace(/\-.*/, '')
    .replace(/(.)/, function ($1) { return $1.toUpperCase() })

  if (context.title == 'Index') {
    context.title = title
  } else {
    context.title += ' · ' + title
  }

  page = Handlebars.compile(page)
  Handlebars.registerPartial('body', page);
  page = layout(context)

  fs.writeFileSync(__dirname + '/../' + name.replace(/hbs$/, 'html'), page, 'utf-8')
})