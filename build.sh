#!/bin/bash
mkdir -p build
find . -name '.DS_Store' -type f -ls -delete
zip -r build/newtab-bookmarks.xpi manifest.json css js icons html
