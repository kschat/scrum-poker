#!/bin/bash

FILENAME=scrum-poker

#Create the standalone .nw file
zip $FILENAME.nw -r index.html package.json LICENSE README.md css/ fonts/ js/

#create the packaged executable
cat /usr/local/bin/nw $FILENAME.nw > $FILENAME"-packaged" && chmod +x $FILENAME"-packaged"
cp /usr/local/bin/nw.pak .
zip $FILENAME"-packaged.zip" $FILENAME"-packaged" nw.pak

#clean up files
rm $FILENAME"-packaged" nw.pak
