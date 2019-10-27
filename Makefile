.PHONY: all test clean

build:
	npm run build
	cp -R static/ dist/static/
	cp static/favicon.ico dist/favicon.ico
#	tree -L 2 dist

clean:
	rm -rf dist

test:
#	npm run test

start:
	npm run start

remove_mac_files:
	find ./ -name ".DS_Store" -exec rm {} \;
