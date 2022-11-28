TARGET_DIR = target

default:
	mkdir -p $(TARGET_DIR)
	src/export.js
	src/process.js

install:
	echo "Not implemented"

clean:
	rm -rf $(TARGET_DIR)
