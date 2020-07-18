CHECK=\033[32m✔\033[39m
XMARK=\033[31m✗\033[39m

HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#


#
# Build Site (html files)
#
generate:
	@echo "\n${HR}"
	@echo "Generating static html"
	node build  # production
	@echo "Generated                                ${CHECK} Done"
	@echo "<3 @daneroo\n"


#
# MAKE FOR GH-PAGES 
#

gh-pages: generate
	@echo "Push im-penrose to gh-pages ${XMARK} NOT Done"
	#cp -r docs/* ../bootstrap-gh-pages

#
# WATCH templates FILES
#

watch:
	echo "Watching less files..."; \
	watchr -e "watch('templates/.*\.mustache') { system 'make' }"


.PHONY: generate watch gh-pages