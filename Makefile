
SRC = $(shell find lib -name "*.js" -type f)
UGLIFY_FLAGS = --no-mangle 

all: ejs.min.js

build: components index.js $(SRC)
	@component build --dev

components: component.json
	@component install --dev -v

test-browser: build
	@node support/build_fixtures.js
	@mocha-phantomjs test/test.html

test:
	@./node_modules/.bin/mocha \
		--reporter spec test/ejs.js

ejs.js: $(SRC)
	@node support/compile.js $^

ejs.min.js: ejs.js
	@uglifyjs $(UGLIFY_FLAGS) $< > $@ \
		&& du ejs.min.js \
		&& du ejs.js

clean:
	rm -f ejs.js
	rm -f ejs.min.js

.PHONY: test