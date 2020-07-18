# Penrose Tiling - Quasiperiodic Tiling

- [js1k entry](https://js1k.com/2013-spring/demo/1437)
- Local/uncompressed `./js1k.html`

## TODO

- Move to lerna
  - packages/
    - site
    - penrose/react
- [Components?](https://theme-ui.com/components)
- Redeploy as a gatsby site using  the Document theme  by [Code Bushi](https://codebushi.com/gatsby-starters-and-themes/), see [im-qcic/site](https://github.com/daneroo/im-qcic/tree/master/packages/site)

## Usage (Lerna)

```bash
lerna init
lerna bootstrap
```

## Penrose Tiling - substitution or deflation approach

It is possible to define a penrose tiling through substitution rules.

## 1-D Quasiperiodic tiling from projections

Todo: rewrite as library, and svg nodes in an html document to show all parts..

## Pentagrid Ribbons

## JS1K

This is the contest blurb:

### A Penrose by any other name

With 5 dimensions this yields a Penrose Tiling;
a 5-fold symmetric non-periodic tiling of the plane.

Rich geometric subject, and beautiful tiling.
squeezing it into 1k - priceless

tl;dr
n-Dimensional hypercube lattice projection onto an n-fold symmetric tiling of the plane.
Random animation with n=3,5,7

how to minify:

```bash
npm install uglify-js -g
uglifyjs p1k.js -o p1k-min.js --lint -m -c
```

## References

- [Wikipedia entry on Penrose Tiling](http://en.wikipedia.org/wiki/Penrose_tiling)
- [Penrose Tilings Tied up in Ribbons](http://www.ams.org/samplings/feature-column/fcarc-ribbons)
  - [Substitution approach in python](http://preshing.com/20110831/penrose-tiling-explained)
  - [SVG algo](http://www.intertwingly.net/blog/2006/07/06/Penrose-Tiling)
  - [SVG](http://intertwingly.net/stories/2006/07/06/penroseTiling.svg)
- [5D projection](http://www.quadibloc.com/math/pen06.htm)
- [QuasiTiler Explanation](http://www.geom.uiuc.edu/apps/quasitiler/)
- [deBruijn explanation](http://gregegan.customer.netspace.net.au/APPLETS/12/12.html) and [PDF article explaining Penrose Tiles by deBruijn](http://alexandria.tue.nl/repository/freearticles/597566.pdf)
- Alison Boyle's [From Quasicrystals to Kleenex](http://plus.maths.org/content/os/issue16/features/penrose/index)
- [Quasicrystals and Geometry](http://www.google.ca/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0CFIQFjAA&url=http%3A%2F%2Fciteseerx.ist.psu.edu%2Fviewdoc%2Fdownload%3Fdoi%3D10.1.1.29.2830%26rep%3Drep1%26type%3Dpdf&ei=fmbvT8mmDIXp6wHi64mDBg&usg=AFQjCNG5tU2s2qmiN2_waEomglX5hLh8kw)

## Building the static site

This build system was replicated from the Bootstrap documentation build system. it uses hogan

```bash
node build
```

## Bootstrap CDN

We are using bootstrap from cdn: <http://www.bootstrapcdn.com/>
